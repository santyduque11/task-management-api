const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

let token;
let testUserId;

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
    expect(response.body).not.toHaveProperty("password");
  });

  test("GET /api/users/:id debe rechazar un ID inválido", async () => {
    const response = await request(app)
      .get("/api/users/abc")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "El ID debe ser un número válido"
    );
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
    const email = `usuario${Date.now()}@test.com`;

    const response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuario Test",
        email,
        password: "Password123",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "Usuario Test");
    expect(response.body).toHaveProperty("email", email);
    expect(response.body).not.toHaveProperty("password");

    testUserId = response.body.id;
  });

  test("POST /api/users debe rechazar datos obligatorios faltantes", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        name: "Usuario Test",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "El nombre, el email y la contraseña son obligatorios"
    );
  });

  test("POST /api/users debe rechazar un nombre demasiado corto", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        name: "Ab",
        email: `nombre${Date.now()}@test.com`,
        password: "Password123",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "El nombre debe tener al menos 3 caracteres"
    );
  });

  test("POST /api/users debe rechazar una contraseña demasiado corta", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        name: "Usuario Test",
        email: `password${Date.now()}@test.com`,
        password: "123",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "La contraseña debe tener al menos 8 caracteres"
    );
  });

  test("POST /api/users debe rechazar un correo electrónico inválido", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        name: "Usuario Test",
        email: "correo-invalido",
        password: "Password123",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "El email no tiene un formato válido"
    );
  });

  test("POST /api/users debe rechazar un correo duplicado", async () => {
    const email = `duplicado${Date.now()}@test.com`;

    await request(app)
      .post("/api/users")
      .send({
        name: "Usuario Original",
        email,
        password: "Password123",
      });

    const response = await request(app)
      .post("/api/users")
      .send({
        name: "Usuario Duplicado",
        email,
        password: "Password123",
      });

    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty(
      "error",
      "El correo electrónico ya está registrado"
    );
  });

  test("PUT /api/users/:id debe actualizar un usuario correctamente", async () => {
    const email = `actualizado${Date.now()}@test.com`;

    const response = await request(app)
      .put(`/api/users/${testUserId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuario Actualizado",
        email,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", testUserId);
    expect(response.body).toHaveProperty("name", "Usuario Actualizado");
    expect(response.body).toHaveProperty("email", email);
    expect(response.body).not.toHaveProperty("password");
  });

  test("PUT /api/users/:id debe rechazar un ID inválido", async () => {
    const response = await request(app)
      .put("/api/users/abc")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuario Actualizado",
        email: "actualizado@test.com",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "El ID debe ser un número válido"
    );
  });

  test("PUT /api/users/:id debe rechazar campos obligatorios faltantes", async () => {
    const response = await request(app)
      .put(`/api/users/${testUserId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuario Actualizado",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "El nombre y el email son obligatorios"
    );
  });

  test("PUT /api/users/:id debe rechazar un email inválido", async () => {
    const response = await request(app)
      .put(`/api/users/${testUserId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuario Actualizado",
        email: "email-invalido",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "El email no tiene un formato válido"
    );
  });

  test("PUT /api/users/:id debe devolver 404 si el usuario no existe", async () => {
    const response = await request(app)
      .put("/api/users/999999")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuario Inexistente",
        email: "inexistente@test.com",
      });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty(
      "error",
      "Usuario no encontrado"
    );
  });

  test("DELETE /api/users/:id debe eliminar un usuario correctamente", async () => {
    const email = `eliminar${Date.now()}@test.com`;

    const createResponse = await request(app)
      .post("/api/users")
      .send({
        name: "Usuario Eliminar",
        email,
        password: "Password123",
      });

    expect(createResponse.statusCode).toBe(201);

    const userId = createResponse.body.id;

    const response = await request(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Usuario eliminado correctamente"
    );
  });

  test("DELETE /api/users/:id debe rechazar un ID inválido", async () => {
    const response = await request(app)
      .delete("/api/users/abc")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "El ID debe ser un número válido"
    );
  });

  test("DELETE /api/users/:id debe devolver 404 si el usuario no existe", async () => {
    const response = await request(app)
      .delete("/api/users/999999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty(
      "error",
      "Usuario no encontrado"
    );
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});