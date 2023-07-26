import request from "supertest";
import { Ticket } from "../../models/ticket";
import { app } from "../../app";
import mongoose from "mongoose";

describe("GET /api/orders", () => {
  let signinCookie: string;

  beforeEach(async () => {
    [signinCookie] = await global.signin();
  });

  it("returns all orders created by the current user", async () => {
    const ticket1 = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "Concert",
      price: 20,
    });
    await ticket1.save();
    const { body: order1 } = await request(app)
      .post("/api/orders")
      .set("Cookie", signinCookie)
      .send({ ticketId: ticket1.id })
      .expect(201);

    const ticket2 = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "Movie",
      price: 15,
    });
    await ticket2.save();
    const { body: order2 } = await request(app)
      .post("/api/orders")
      .set("Cookie", signinCookie)
      .send({ ticketId: ticket2.id })
      .expect(201);

    const response = await request(app)
      .get("/api/orders")
      .set("Cookie", signinCookie)
      .send()
      .expect(200);

    expect(response.body.length).toEqual(2);
    expect(response.body[0].ticket.id).toEqual(ticket1.id);
    expect(response.body[0].id).toEqual(order1.id);
    expect(response.body[1].ticket.id).toEqual(ticket2.id);
    expect(response.body[1].id).toEqual(order2.id);
  });

  it("does not return orders not created by the current user", async () => {
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "Concert",
      price: 20,
    });
    await ticket.save();

    await request(app)
      .post("/api/orders")
      .set("Cookie", global.signin()[0])
      .send({ ticketId: ticket.id })
      .expect(201);

    const response = await request(app)
      .get("/api/orders")
      .set("Cookie", signinCookie)
      .send()
      .expect(200);

    expect(response.body.length).toEqual(0);
  });
});
