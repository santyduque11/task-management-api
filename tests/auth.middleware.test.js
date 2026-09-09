process.env.DATABASE_URL =
  "postgresql://postgres:postgres@localhost:5433/task_management";

process.env.JWT_SECRET = "test-secret-key-for-auth-middleware";

const jwt = require("jsonwebtoken");

const authenticateToken = require("../src/middleware/auth.middleware");

describe("authenticateToken middleware", () => {
  const JWT_SECRET = process.env.JWT_SECRET;

  test("debe rechazar la petición cuando no existe Authorization", () => {
    const req = {
      headers: {},
    };

    const res = {};
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    const error = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(Error);
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe("Token de autenticación requerido");
  });

  test("debe rechazar la petición cuando el formato del token es inválido", () => {
    const req = {
      headers: {
        authorization: "Token abc123",
      },
    };

    const res = {};
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    const error = next.mock.calls[0][0];

    expect(error.statusCode).toBe(401);
    expect(error.message).toBe("Formato de token inválido");
  });

  test("debe rechazar la petición cuando no existe el token", () => {
    const req = {
      headers: {
        authorization: "Bearer",
      },
    };

    const res = {};
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    const error = next.mock.calls[0][0];

    expect(error.statusCode).toBe(401);
    expect(error.message).toBe("Formato de token inválido");
  });

  test("debe rechazar un JWT inválido", () => {
    const req = {
      headers: {
        authorization: "Bearer token-invalido",
      },
    };

    const res = {};
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    const error = next.mock.calls[0][0];

    expect(error.statusCode).toBe(401);
    expect(error.message).toBe("Token inválido o expirado");
  });

  test("debe aceptar un JWT válido y guardar el usuario en req.user", () => {
    const payload = {
      id: 11,
      email: "testbackend@example.com",
      role: "USER",
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h",
    });

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const res = {};
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
    expect(req.user).toMatchObject(payload);
  });
});
