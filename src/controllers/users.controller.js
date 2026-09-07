const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener los usuarios",
    });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validar que el ID sea un número válido
    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "El ID debe ser un número válido",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener el usuario",
    });
  }
};

// Crear un usuario
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar campos obligatorios
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "El nombre, el email y la contraseña son obligatorios",
      });
    }

    // Validar formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "El email no tiene un formato válido",
      });
    }

    // Generar hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Nunca devolver la contraseña ni el hash
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);

    // Email duplicado
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "El email ya está registrado",
      });
    }

    res.status(500).json({
      error: "Error al crear el usuario",
    });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validar que el ID sea un número válido
    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "El ID debe ser un número válido",
      });
    }

    const { name, email } = req.body;

    // Validar campos obligatorios
    if (!name || !email) {
      return res.status(400).json({
        error: "El nombre y el email son obligatorios",
      });
    }

    // Validar formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "El email no tiene un formato válido",
      });
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);

    // Usuario no encontrado
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    // Email duplicado
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "El email ya está registrado",
      });
    }

    res.status(500).json({
      error: "Error al actualizar el usuario",
    });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validar que el ID sea un número válido
    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "El ID debe ser un número válido",
      });
    }

    await prisma.user.delete({
      where: { id },
    });

    res.json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    // Usuario no encontrado
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    res.status(500).json({
      error: "Error al eliminar el usuario",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};