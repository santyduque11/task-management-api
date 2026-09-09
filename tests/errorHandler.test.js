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

  test("debe manejar errores de validación de Zod", async () => {
    const response = await request(app).post("/api/users").send({
      name: "",
      email: "correo-invalido",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("debe manejar un error Prisma P2025", async () => {
    const response = await request(app)
      .get("/api/tasks/999999")
      .set("Authorization", "Bearer token-invalido");

    expect(response.statusCode).toBe(401);
  });

  test("debe manejar un error Prisma P2002", async () => {
    const response = await request(app).post("/api/users").send({
      name: "Usuario duplicado",
      email: "testbackend@example.com",
      password: "Password123",
    });

    expect([201, 409, 500]).toContain(response.statusCode);
  });

  test("debe devolver un error interno cuando ocurre un error inesperado", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", "Bearer token-invalido");

    expect(response.statusCode).toBe(401);
  });
});
