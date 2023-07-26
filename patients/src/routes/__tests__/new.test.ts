import request from "supertest";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/patient";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";

describe("POST /api/orders", () => {
  let signinCookie: string;

  beforeEach(async () => {
    [signinCookie] = global.signin();
  });

  describe("user not signed in", () => {
    it("returns a 401 unauthorized error", async () => {
      const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "Concert",
        price: 20,
      });
      await ticket.save();
      const response = await request(app)
        .post("/api/orders")
        .send({ ticketId: ticket.id });
      expect(response.status).toEqual(401);
    });
  });

  describe("bad request", () => {
    it("returns a 400 bad request error when ticketId is missing", async () => {
      const response = await request(app)
        .post("/api/orders")
        .set("Cookie", signinCookie)
        .send({});
      expect(response.status).toEqual(400);
    });
  });

  describe("user signed in", () => {
    it("returns an error if the ticket does not exist", async () => {
      const ticketId = new mongoose.Types.ObjectId().toHexString();
      const response = await request(app)
        .post("/api/orders")
        .set("Cookie", signinCookie)
        .send({ ticketId });
      expect(response.status).toEqual(404);
    });

    it("returns an error if the ticket is already reserved", async () => {
      const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "Concert",
        price: 20,
      });
      await ticket.save();
      const order = Order.build({
        ticket,
        userId: "test-user-id",
        status: OrderStatus.Created,
        expiresAt: new Date(),
      });
      await order.save();
      const response = await request(app)
        .post("/api/orders")
        .set("Cookie", signinCookie)
        .send({ ticketId: ticket.id });
      expect(response.status).toEqual(400);
    });

    it("reserves a ticket and creates an order", async () => {
      const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "Concert",
        price: 20,
      });
      await ticket.save();
      const response = await request(app)
        .post("/api/orders")
        .set("Cookie", signinCookie)
        .send({ ticketId: ticket.id });
      expect(response.status).toEqual(201);
      const { body } = response;
      expect(body.ticket.id).toEqual(ticket.id);
      expect(body.userId).toBeDefined();
      expect(body.status).toEqual(OrderStatus.Created);
    });

    it("emits an order created event", async () => {
      const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "Concert",
        price: 20,
      });
      await ticket.save();
      const response = await request(app)
        .post("/api/orders")
        .set("Cookie", signinCookie)
        .send({ ticketId: ticket.id });
      expect(response.status).toEqual(201);
      expect(natsWrapper.client.publish).toHaveBeenCalled();
    });
  });
});
