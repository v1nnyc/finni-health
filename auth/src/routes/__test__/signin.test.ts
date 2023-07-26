import request from "supertest";
import { app } from "../../app";

import { User } from "../../models/user";

describe("POST /api/users/signin", () => {
  it("returns a 400 status code when an incorrect email is supplied", async () => {
    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "invalid-email",
        password: "password",
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
  });

  it("returns a 400 status code when an incorrect password is supplied", async () => {
    await User.create({
      email: "test@example.com",
      password: "password",
    });

    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@example.com",
        password: "wrong-password",
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
  });

  it("returns a 200 status code and a user object when correct credentials are supplied", async () => {
    const email = "test@example.com";
    const password = "password";

    await User.create({
      email,
      password,
    });

    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email,
        password,
      })
      .expect(200);

    expect(response.body.email).toEqual(email);
    expect(response.body.password).toBeUndefined();
  });

  it("returns a 400 status code when email is missing from the request body", async () => {
    const response = await request(app)
      .post("/api/users/signin")
      .send({
        password: "password",
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
  });

  it("returns a 400 status code when password is missing from the request body", async () => {
    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@example.com",
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
  });

  it("returns a 400 status code when email is not registered", async () => {
    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "non-existent@example.com",
        password: "password",
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
  });

  it("sets a cookie when valid credentials are supplied", async () => {
    const email = "test@example.com";
    const password = "password";

    await User.create({
      email,
      password,
    });

    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email,
        password,
      })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });

  it("returns the correct cookie when valid credentials are supplied", async () => {
    const email = "test@example.com";
    const password = "password";

    await User.create({
      email,
      password,
    });

    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email,
        password,
      })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
