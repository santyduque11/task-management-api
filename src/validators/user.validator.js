const { z } = require("zod");

const createUserSchema = z.object({
  name: z
    .string("El nombre, el email y la contraseña son obligatorios")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  email: z
    .string("El nombre, el email y la contraseña son obligatorios")
    .email("El email no tiene un formato válido"),

  password: z
    .string("El nombre, el email y la contraseña son obligatorios")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});
const updateUserSchema = z.object({
  name: z
    .string("El nombre y el email son obligatorios")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  email: z
    .string("El nombre y el email son obligatorios")
    .email("El email no tiene un formato válido"),
});
const userIdSchema = z.object({
  id: z
    .string("El ID es obligatorio")
    .regex(/^\d+$/, "El ID debe ser un número válido"),
});

module.exports = {

  createUserSchema,
  updateUserSchema,
  userIdSchema,

};