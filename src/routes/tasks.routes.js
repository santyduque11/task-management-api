const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");

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