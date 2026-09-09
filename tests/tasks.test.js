const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

let token;
let otherUserToken;
let taskId;
let otherUserId;

beforeAll(async () => {
  // Login del usuario principal

  const response = await request(app).post("/api/auth/login").send({
    email: "testbackend@example.com",
    password: "Password123",
  });

  expect(response.statusCode).toBe(200);

  token = response.body.token;

  // Crear un segundo usuario para probar autorización por propietario

  const otherUserEmail = `otro-usuario-${Date.now()}@test.com`;

  const otherUserResponse = await request(app).post("/api/users").send({
    name: "Otro Usuario",
    email: otherUserEmail,
    password: "Password123",
  });

  expect(otherUserResponse.statusCode).toBe(201);

  otherUserId = otherUserResponse.body.id;

  // Login del segundo usuario

  const otherLoginResponse = await request(app).post("/api/auth/login").send({
    email: otherUserEmail,
    password: "Password123",
  });

  expect(otherLoginResponse.statusCode).toBe(200);

  otherUserToken = otherLoginResponse.body.token;
});

describe("Tasks API", () => {
  test("GET /api/tasks debe devolver las tareas paginadas del usuario autenticado", async () => {
    const response = await request(app)
      .get("/api/tasks?page=1&limit=10")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("pagination");

    expect(Array.isArray(response.body.data)).toBe(true);

    expect(response.body.pagination).toHaveProperty("page", 1);
    expect(response.body.pagination).toHaveProperty("limit", 10);
    expect(response.body.pagination).toHaveProperty("total");
    expect(response.body.pagination).toHaveProperty("totalPages");
  });

  test("GET /api/tasks?completed=true debe devolver solo tareas completadas", async () => {
    const response = await request(app)
      .get("/api/tasks?page=1&limit=10&completed=true")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);

    response.body.data.forEach((task) => {
      expect(task.completed).toBe(true);
    });
  });

  test("GET /api/tasks debe rechazar una página menor que 1", async () => {
    const response = await request(app)
      .get("/api/tasks?page=0&limit=10")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);

    expect(response.body).toHaveProperty(
      "error",
      "La página debe ser mayor o igual a 1"
    );
  });

  test("GET /api/tasks debe rechazar un límite menor que 1", async () => {
    const response = await request(app)
      .get("/api/tasks?page=1&limit=0")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);

    expect(response.body).toHaveProperty(
      "error",
      "El límite debe ser mayor o igual a 1"
    );
  });

  test("GET /api/tasks debe rechazar un límite mayor que 100", async () => {
    const response = await request(app)
      .get("/api/tasks?page=1&limit=101")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);

    expect(response.body).toHaveProperty(
      "error",
      "El límite no puede superar 100"
    );
  });

  test("GET /api/tasks debe rechazar una página que no sea numérica", async () => {
    const response = await request(app)
      .get("/api/tasks?page=abc&limit=10")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);

    expect(response.body).toHaveProperty(
      "error",
      "La página debe ser un número"
    );
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

    expect(response.body).toHaveProperty("error", "El título es obligatorio");
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

    expect(response.body).toHaveProperty("error", "Tarea no encontrada");
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

  test("GET /api/tasks/:id debe rechazar el acceso a una tarea de otro usuario", async () => {
    const response = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${otherUserToken}`);

    expect(response.statusCode).toBe(403);

    expect(response.body).toHaveProperty(
      "error",
      "No tienes permiso para acceder a esta tarea"
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

    expect(response.body).toHaveProperty("error", "Tarea no encontrada");
  });

  test("PUT /api/tasks/:id debe rechazar la modificación de una tarea de otro usuario", async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${otherUserToken}`)
      .send({
        title: "Cambio no autorizado",
        description: "Intento de modificación",
        completed: false,
      });

    expect(response.statusCode).toBe(403);

    expect(response.body).toHaveProperty(
      "error",
      "No tienes permiso para modificar esta tarea"
    );
  });

  test("DELETE /api/tasks/:id debe rechazar la eliminación de una tarea de otro usuario", async () => {
    const response = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${otherUserToken}`);

    expect(response.statusCode).toBe(403);

    expect(response.body).toHaveProperty(
      "error",
      "No tienes permiso para eliminar esta tarea"
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

    expect(response.body).toHaveProperty("error", "Tarea no encontrada");
  });
});

afterAll(async () => {
  // Eliminar el segundo usuario creado exclusivamente para las pruebas

  if (otherUserId) {
    await prisma.user.delete({
      where: {
        id: otherUserId,
      },
    });
  }

  await prisma.$disconnect();
});
