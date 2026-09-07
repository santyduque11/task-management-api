const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

let token;

beforeAll(async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "testbackend@example.com",
      password: "Password123",
    });

  expect(response.statusCode).toBe(200);

  token = response.body.token;
});

describe("Users API", () => {
  test("GET /api/users debe responder con una lista de usuarios", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/users/:id debe devolver un usuario existente", async () => {
    const response = await request(app)
      .get("/api/users/11")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", 11);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
  });

  test("GET /api/users/:id debe devolver 404 si el usuario no existe", async () => {
    const response = await request(app)
      .get("/api/users/999999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty(
      "error",
      "Usuario no encontrado"
    );
  });

  test("POST /api/users debe crear un usuario correctamente", async () => {
    const response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuario Test",
        email: `usuario${Date.now()}@test.com`,
        password: "Password123",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "Usuario Test");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
  });

  test("POST /api/users debe rechazar una contraseña demasiado corta", async () => {
    const response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuario Test",
        email: `usuario${Date.now()}@test.com`,
        password: "123",
      });

    expect(response.statusCode).toBe(400);
  });

  test("POST /api/users debe rechazar un correo electrónico inválido", async () => {
    const response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuario Test",
        email: "correo-invalido",
        password: "Password123",
      });

    expect(response.statusCode).toBe(400);
  });

  test("POST /api/users debe rechazar un correo duplicado", async () => {
    const email = `duplicado${Date.now()}@test.com`;

    await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuario Original",
        email: email,
        password: "Password123",
      });

    const response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuario Duplicado",
        email: email,
        password: "Password123",
      });

    expect(response.statusCode).toBe(409);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});