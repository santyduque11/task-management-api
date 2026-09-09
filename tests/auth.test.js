const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

describe("Authentication API", () => {
  test("POST /api/auth/login debe iniciar sesión correctamente", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "testbackend@example.com",
      password: "Password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id", 11);
    expect(response.body.user).toHaveProperty(
      "email",
      "testbackend@example.com"
    );

    // Verificar que el usuario tenga un rol
    expect(response.body.user).toHaveProperty("role");
    expect(response.body.user.role).toBe("USER");
  });

  test("POST /api/auth/login debe rechazar credenciales incompletas", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "testbackend@example.com",
    });

    expect(response.statusCode).toBe(400);
  });

  test("POST /api/auth/login debe rechazar un usuario inexistente", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "usuarioinexistente@example.com",
      password: "Password123",
    });

    expect(response.statusCode).toBe(401);
  });

  test("POST /api/auth/login debe rechazar una contraseña incorrecta", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "testbackend@example.com",
      password: "PasswordIncorrecta",
    });

    expect(response.statusCode).toBe(401);

    expect(response.body).toEqual({
      error: "Credenciales inválidas",
    });
  });

  test("POST /api/auth/login debe rechazar un usuario sin contraseña", async () => {
    const userWithoutPassword = await prisma.user.create({
      data: {
        name: "Usuario Sin Password",
        email: "sinpassword@example.com",
        password: null,
        role: "USER",
      },
    });

    const response = await request(app).post("/api/auth/login").send({
      email: userWithoutPassword.email,
      password: "Password123",
    });

    expect(response.statusCode).toBe(401);

    expect(response.body).toEqual({
      error: "Credenciales inválidas",
    });

    await prisma.user.delete({
      where: {
        id: userWithoutPassword.id,
      },
    });
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
