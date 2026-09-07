const express = require("express");

const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

const authenticateToken = require("../middleware/auth.middleware");

// Obtener todos los usuarios
router.get("/", authenticateToken, getUsers);

// Obtener un usuario por ID
router.get("/:id", authenticateToken, getUserById);

// Crear un usuario
router.post("/", authenticateToken, createUser);

// Actualizar un usuario
router.put("/:id", authenticateToken, updateUser);

// Eliminar un usuario
router.delete("/:id", authenticateToken, deleteUser);

module.exports = router;