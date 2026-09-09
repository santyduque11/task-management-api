const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const usersRoutes = require("./routes/users.routes");
const tasksRoutes = require("./routes/tasks.routes");
const authRoutes = require("./auth/auth.routes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Demasiadas solicitudes. Intenta nuevamente más tarde.",
    statusCode: 429,
  },
});

app.use(helmet());

app.use(cors());

app.use(apiLimiter);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Task Management API is running",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", usersRoutes);

app.use("/api/tasks", tasksRoutes);

app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

module.exports = app;