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

// Obtener todas las tareas con paginación y filtros

const getTasks = asyncHandler(async (req, res) => {
  const userId = Number(req.user.userId);

  // Obtener parámetros de consulta ya validados por Zod

  const { page, limit, completed } = req.validatedQuery;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  // Calcular cuántos registros debemos saltar

  const skip = (pageNumber - 1) * limitNumber;

  // Construir el filtro de búsqueda

  const where = {
    userId,
  };

  // Aplicar filtro por estado si fue enviado

  if (completed !== undefined) {
    where.completed = completed;
  }

  // Obtener las tareas y el total de tareas

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip,
      take: limitNumber,
    }),

    prisma.task.count({
      where,
    }),
  ]);

  // Calcular el total de páginas

  const totalPages = Math.ceil(total / limitNumber);

  res.json({
    data: tasks,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages,
    },
  });
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
