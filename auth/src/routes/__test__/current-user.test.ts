import request from "supertest";
import { app } from "../../app";

describe("GET /api/users/currentuser", () => {
  let cookie: string[];
  let user: { email: string; password: string };

  beforeAll(async () => {
    user = { email: "test@test.com", password: "1234" };
    const authResponse = await request(app)
      .post("/api/users/signup")
      .send(user)
      .expect(201);

    cookie = authResponse.get("Set-Cookie");
  });

  it("responds with current user details when authenticated", async () => {
    const response = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual(user.email);
  });

  it("responds with null if not authenticated", async () => {
    const response = await request(app).get("/api/users/currentuser").send();

    expect(response.body.currentUser).toBeNull();
  });
});
