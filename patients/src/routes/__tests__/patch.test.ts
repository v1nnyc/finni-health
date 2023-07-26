import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/patient";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

describe("PATCH /api/orders/:orderId", () => {
  let signinCookie: string;

  beforeEach(async () => {
    [signinCookie] = global.signin();
  });

  it("returns 401 if the user is not authenticated", async () => {
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "Concert",
      price: 20,
    });
    await ticket.save();
    const order = await request(app)
      .post("/api/orders")
      .set("Cookie", signinCookie)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app).get(`/api/orders/${order.body.id}`).send().expect(401);
  });

  it("returns 404 if the order is not found", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app)
      .patch(`/api/orders/${id}`)
      .set("Cookie", signinCookie)
      .send()
      .expect(404);
  });

  it("returns 401 if the user tries to cancel another user's order", async () => {
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "Concert",
      price: 20,
    });
    await ticket.save();
    const order = await request(app)
      .post("/api/orders")
      .set("Cookie", signinCookie)
      .send({ ticketId: ticket.id })
      .expect(201);

    const response = await request(app)
      .patch(`/api/orders/${order.body.id}`)
      .set("Cookie", global.signin()[0])
      .send()
      .expect(401);
  });

  it("returns the updated order with a status of cancelled", async () => {
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "Concert",
      price: 20,
    });
    await ticket.save();
    const order = await request(app)
      .post("/api/orders")
      .set("Cookie", signinCookie)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app)
      .patch(`/api/orders/${order.body.id}`)
      .set("Cookie", signinCookie)
      .send()
      .expect(204);

    const updatedOrder = await Order.findById(order.body.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
  });

  it("publishes an event when an order is cancelled", async () => {
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "Concert",
      price: 20,
    });
    await ticket.save();
    const order = await request(app)
      .post("/api/orders")
      .set("Cookie", signinCookie)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app)
      .patch(`/api/orders/${order.body.id}`)
      .set("Cookie", signinCookie)
      .send()
      .expect(204);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
