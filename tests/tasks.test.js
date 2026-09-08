const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

let token;
let taskId;

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

describe("Tasks API", () => {
  test("GET /api/tasks debe devolver las tareas del usuario autenticado", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /api/tasks debe crear una tarea correctamente", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Tarea de prueba",
        description: "Descripción de prueba",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title", "Tarea de prueba");
    expect(response.body).toHaveProperty(
      "description",
      "Descripción de prueba"
    );
    expect(response.body).toHaveProperty("completed", false);

    taskId = response.body.id;
  });

  test("POST /api/tasks debe rechazar una tarea sin título", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Tarea sin título",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "El título es obligatorio"
    );
  });

  test("POST /api/tasks debe rechazar un título demasiado corto", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "ab",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "El título debe tener al menos 3 caracteres"
    );
  });

  test("GET /api/tasks/:id debe devolver una tarea existente", async () => {
    const response = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", taskId);
    expect(response.body).toHaveProperty("title", "Tarea de prueba");
  });

  test("GET /api/tasks/:id debe devolver 404 si la tarea no existe", async () => {
    const response = await request(app)
      .get("/api/tasks/999999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty(
      "error",
      "Tarea no encontrada"
    );
  });

  test("GET /api/tasks/:id debe rechazar un ID inválido", async () => {
    const response = await request(app)
      .get("/api/tasks/abc")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "El ID debe ser un número válido"
    );
  });

  test("PUT /api/tasks/:id debe actualizar una tarea correctamente", async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Tarea actualizada",
        description: "Descripción actualizada",
        completed: true,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", taskId);
    expect(response.body).toHaveProperty("title", "Tarea actualizada");
    expect(response.body).toHaveProperty(
      "description",
      "Descripción actualizada"
    );
    expect(response.body).toHaveProperty("completed", true);
  });

  test("PUT /api/tasks/:id debe rechazar completed si no es booleano", async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Tarea actualizada",
        description: "Descripción",
        completed: "true",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "El campo completed debe ser true o false"
    );
  });

  test("PUT /api/tasks/:id debe devolver 404 si la tarea no existe", async () => {
    const response = await request(app)
      .put("/api/tasks/999999")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Tarea inexistente",
        description: "Descripción",
        completed: false,
      });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty(
      "error",
      "Tarea no encontrada"
    );
  });

  test("DELETE /api/tasks/:id debe eliminar una tarea correctamente", async () => {
    const response = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Tarea eliminada correctamente"
    );
  });

  test("DELETE /api/tasks/:id debe devolver 404 si la tarea no existe", async () => {
    const response = await request(app)
      .delete("/api/tasks/999999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty(
      "error",
      "Tarea no encontrada"
    );
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});