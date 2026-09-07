const prisma = require("../config/prisma");

// Crear una tarea
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const userId = req.user.userId;

    // Validar título
    if (!title) {
      return res.status(400).json({
        error: "El título es obligatorio",
      });
    }

    if (typeof title !== "string") {
      return res.status(400).json({
        error: "El título debe ser un texto",
      });
    }

    if (title.trim().length < 3) {
      return res.status(400).json({
        error: "El título debe tener al menos 3 caracteres",
      });
    }

    // Validar descripción
    if (description !== undefined && typeof description !== "string") {
      return res.status(400).json({
        error: "La descripción debe ser un texto",
      });
    }

    // Verificar que el usuario exista
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
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
        userId: Number(userId),
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear la tarea",
    });
  }
};

// Obtener todas las tareas
const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: Number(req.user.userId),
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las tareas",
    });
  }
};

// Obtener una tarea por ID
const getTaskById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validar que el ID sea un número válido
    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "El ID debe ser un número válido",
      });
    }

    const task = await prisma.task.findUnique({
      where: { id },
    });

    // Verificar que la tarea exista
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
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener la tarea",
    });
  }
};

// Actualizar una tarea
const updateTask = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validar que el ID sea un número válido
    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "El ID debe ser un número válido",
      });
    }

    const { title, description, completed } = req.body;

    // Validar título
    if (!title) {
      return res.status(400).json({
        error: "El título es obligatorio",
      });
    }

    if (typeof title !== "string") {
      return res.status(400).json({
        error: "El título debe ser un texto",
      });
    }

    if (title.trim().length < 3) {
      return res.status(400).json({
        error: "El título debe tener al menos 3 caracteres",
      });
    }

    // Validar descripción
    if (description !== undefined && typeof description !== "string") {
      return res.status(400).json({
        error: "La descripción debe ser un texto",
      });
    }

    // Validar completed
    if (typeof completed !== "boolean") {
      return res.status(400).json({
        error: "El campo completed debe ser true o false",
      });
    }

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
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar la tarea",
    });
  }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validar que el ID sea un número válido
    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "El ID debe ser un número válido",
      });
    }

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
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar la tarea",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};