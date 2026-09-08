const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Errores de validación de Zod
  if (err instanceof ZodError) {
    const firstError = err.issues[0];

    return res.status(400).json({
      error: firstError.message,
      statusCode: 400,
    });
  }

  // Registro no encontrado en Prisma
  if (err.code === "P2025") {
    const modelName = err.meta?.modelName;

    const resourceMessages = {
      User: "Usuario no encontrado",
      Task: "Tarea no encontrada",
    };

    return res.status(404).json({
      error: resourceMessages[modelName] || "Recurso no encontrado",
      statusCode: 404,
    });
  }

  // Registro duplicado en Prisma
  if (err.code === "P2002") {
    if (err.meta?.modelName === "User") {
      const message =
        req.method === "POST"
          ? "El correo electrónico ya está registrado"
          : "El email ya está registrado";

      return res.status(409).json({
        error: message,
        statusCode: 409,
      });
    }

    return res.status(409).json({
      error: "El recurso ya existe",
      statusCode: 409,
    });
  }

  // Error HTTP personalizado
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
    statusCode,
  });
};

module.exports = errorHandler;