const express = require("express");

const usersRoutes = require("./routes/users.routes");
const tasksRoutes = require("./routes/tasks.routes");
const authRoutes = require("./auth/auth.routes");

const app = express();

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});