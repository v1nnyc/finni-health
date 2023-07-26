import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

describe("GET /api/orders/:orderId", () => {
  let signinCookie: string;

  beforeEach(async () => {
    [signinCookie] = global.signin();
  });

  it("returns 404 if the order is not found", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .get(`/api/orders/${id}`)
      .set("Cookie", signinCookie)
      .send()
      .expect(404);
  });

  it("returns 401 if the user tries to fetch another user's order", async () => {
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "Concert",
      price: 20,
    });
    await ticket.save();
    const orderResponse = await request(app)
      .post("/api/orders")
      .set("Cookie", signinCookie)
      .send({ ticketId: ticket.id })
      .expect(201);

    const otherUserCookie = global.signin();
    await request(app)
      .get(`/api/orders/${orderResponse.body.id}`)
      .set("Cookie", otherUserCookie)
      .send()
      .expect(401);
  });

  it("returns the order if the user is authorized", async () => {
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "Concert",
      price: 20,
    });
    await ticket.save();
    const orderResponse = await request(app)
      .post("/api/orders")
      .set("Cookie", signinCookie)
      .send({ ticketId: ticket.id })
      .expect(201);

    const response = await request(app)
      .get(`/api/orders/${orderResponse.body.id}`)
      .set("Cookie", signinCookie)
      .send()
      .expect(200);

    expect(response.body.id).toEqual(orderResponse.body.id);
    expect(response.body.ticket.id).toEqual(ticket.id);
  });
});
