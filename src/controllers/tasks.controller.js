const prisma = require("../config/prisma");
const asyncHandler = require("../middleware/asyncHandler");

// Crear una tarea

const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const userId = Number(req.user.userId);

  // Verificar que el usuario exista

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({
      error: "El usuario no existe",
    });
  }

  // Crear la tarea

  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId,
    },
  });

  res.status(201).json(task);
});

// Obtener todas las tareas

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId: Number(req.user.userId),
    },
  });

  res.json(tasks);
});

// Obtener una tarea por ID

const getTaskById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task) {
    return res.status(404).json({
      error: "Tarea no encontrada",
    });
  }

  // Verificar que la tarea pertenezca al usuario autenticado

  if (task.userId !== Number(req.user.userId)) {
    return res.status(403).json({
      error: "No tienes permiso para acceder a esta tarea",
    });
  }

  res.json(task);
});

// Actualizar una tarea

const updateTask = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const { title, description, completed } = req.body;

  // Buscar la tarea existente

  const existingTask = await prisma.task.findUnique({
    where: { id },
  });

  if (!existingTask) {
    return res.status(404).json({
      error: "Tarea no encontrada",
    });
  }

  // Verificar que la tarea pertenezca al usuario autenticado

  if (existingTask.userId !== Number(req.user.userId)) {
    return res.status(403).json({
      error: "No tienes permiso para modificar esta tarea",
    });
  }

  const task = await prisma.task.update({
    where: { id },
    data: {
      title,
      description,
      completed,
    },
  });

  res.json(task);
});

// Eliminar una tarea

const deleteTask = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  // Buscar la tarea existente

  const existingTask = await prisma.task.findUnique({
    where: { id },
  });

  if (!existingTask) {
    return res.status(404).json({
      error: "Tarea no encontrada",
    });
  }

  // Verificar que la tarea pertenezca al usuario autenticado

  if (existingTask.userId !== Number(req.user.userId)) {
    return res.status(403).json({
      error: "No tienes permiso para eliminar esta tarea",
    });
  }

  await prisma.task.delete({
    where: { id },
  });

  res.json({
    message: "Tarea eliminada correctamente",
  });
});

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};