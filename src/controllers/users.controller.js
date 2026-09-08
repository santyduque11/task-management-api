const prisma = require("../config/prisma");
const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcrypt");

// Obtener todos los usuarios

const getUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  res.json(users);
});

// Obtener un usuario por ID

const getUserById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

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
});

// Crear un usuario

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

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
});

// Actualizar un usuario

const updateUser = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const { name, email } = req.body;

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
});

// Eliminar un usuario

const deleteUser = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  await prisma.user.delete({
    where: { id },
  });

  res.json({
    message: "Usuario eliminado correctamente",
  });
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};