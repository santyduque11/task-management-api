const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const usersRoutes = require("./routes/users.routes");
const tasksRoutes = require("./routes/tasks.routes");
const authRoutes = require("./auth/auth.routes");

const app = express();

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

module.exports = app;