const request = require("supertest");
const app = require("../src/app");

describe("Health Check", () => {
  test("GET /health debe indicar que la API está funcionando", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      message: "Task Management API is running",
    });
  });
});
