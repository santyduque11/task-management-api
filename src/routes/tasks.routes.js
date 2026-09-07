const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/auth.middleware");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");

// Proteger todas las rutas de tareas
router.use(authenticateToken);

// Obtener todas las tareas
router.get("/", getTasks);

// Obtener una tarea por ID
router.get("/:id", getTaskById);

// Crear una tarea
router.post("/", createTask);

// Actualizar una tarea
router.put("/:id", updateTask);

// Eliminar una tarea
router.delete("/:id", deleteTask);

module.exports = router;