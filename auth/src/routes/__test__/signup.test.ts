import request from "supertest";
import { app } from "../../app";

const dummyUser = {
  email: "test@test.com",
  password: "password",
};

it("returns a 201 on successful signup", async () => {
  return request(app).post("/api/users/signup").send(dummyUser).expect(201);
});

it("returns a 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with invalid password", async () => {
  // too short
  request(app)
    .post("/api/users/signup")
    .send({ email: "testtest.com", password: "123" })
    .expect(400);
  // too long
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "1234567898765748392473248234",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
    })
    .expect(400);
  return request(app)
    .post("/api/users/signup")
    .send({
      password: "1234",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app).post("/api/users/signup").send(dummyUser).expect(201);
  await request(app).post("/api/users/signup").send(dummyUser).expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send(dummyUser)
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
