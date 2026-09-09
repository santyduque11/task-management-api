const requireRole = require("../src/middleware/requireRole");

describe("requireRole middleware", () => {
  test("debe rechazar cuando el usuario no está autenticado", () => {
    const middleware = requireRole("ADMIN");

    const req = {};
    const res = {};
    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    const error = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(Error);
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe("Usuario no autenticado");
  });

  test("debe rechazar cuando el usuario no tiene un rol permitido", () => {
    const middleware = requireRole("ADMIN");

    const req = {
      user: {
        id: 11,
        role: "USER",
      },
    };

    const res = {};
    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    const error = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(Error);
    expect(error.statusCode).toBe(403);
    expect(error.message).toBe("No tienes permisos para realizar esta acción");
  });

  test("debe permitir el acceso cuando el usuario tiene un rol permitido", () => {
    const middleware = requireRole("ADMIN");

    const req = {
      user: {
        id: 1,
        role: "ADMIN",
      },
    };

    const res = {};
    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });
});
