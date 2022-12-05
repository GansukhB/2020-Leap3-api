const app = require("./app");
const request = require("supertest");
const mongoose = require("mongoose");

beforeAll(async () => {
  if (!process.env.MONGODB_URL) {
    process.env.MONGODB_URL = "mongodb://localhost:27017/leap3_test";
  }
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URL);
    const connection = mongoose.connection;

    connection.once("open", () => {
      console.log("Connected to test server");
    });
  }
});
afterAll(async () => {
  await mongoose.connection.close();
});

test("Test root path", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
  expect(res.text).toBe("Hello World!");
});

test("Test user registrations", async () => {
  const res = await request(app).post("/profile").send({
    username: "test",
    password: "test",
    name: "test",
    email: "email@email.com",
    phone: "11223344",
    gender: "m",
    location: "Mongolia",
  });
  expect(res.statusCode).toBe(200);
  const resData = JSON.parse(res.text);
  expect(resData.message).toBe("Saved");
});
