const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ZodError) {
    const firstError = err.issues[0];

    return res.status(400).json({
      error: firstError.message,
      statusCode: 400,
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
    statusCode,
  });
};

module.exports = errorHandler;