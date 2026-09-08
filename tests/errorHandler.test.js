const request = require("supertest");
const app = require("../src/app");

describe("Error Handler", () => {
  test("debe devolver 404 cuando la ruta no existe", async () => {
    const response = await request(app).get("/ruta-que-no-existe");

    expect(response.statusCode).toBe(404);

    expect(response.body).toEqual({
      error: "Not Found",
      statusCode: 404,
    });
  });
});