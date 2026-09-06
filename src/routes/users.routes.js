const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

// Obtener todos los usuarios
router.get("/", getUsers);

// Obtener un usuario por ID
router.get("/:id", getUserById);

// Crear un usuario
router.post("/", createUser);

// Actualizar un usuario
router.put("/:id", updateUser);

// Eliminar un usuario
router.delete("/:id", deleteUser);

module.exports = router;