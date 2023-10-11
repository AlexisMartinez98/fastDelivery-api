const request = require("supertest");
const app = require("../../server");

test("It should give an error when entering different passwords", async () => {
  const userData = {
    email: "test@example.com",
    password: "Pas123456",
    confirm_password: "Pas123456error",
  };

  const response = await request(app)
    .post("/api/v1/user/register")
    .send(userData);

  expect(response.statusCode).toBe(404);
});

test("should create a new user", async () => {
  jest.setTimeout(10000);

  const userData = {
    email: "test@example.com",
    password: "Pas123456",
    confirm_password: "Pas123456",
  };

  const response = await request(app)
    .post("/api/v1/user/register")
    .send(userData);

  expect(response.statusCode).toBe(201);
});

test("It should give an error when registering an existing email", async () => {
  const userData = {
    email: "test@example.com",
    password: "Pas123456",
    confirm_password: "Pas123456",
  };

  const response = await request(app)
    .post("/api/v1/user/register")
    .send(userData);

  expect(response.statusCode).toBe(400);
});

