const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string("El email es obligatorio")
    .email("El email no tiene un formato válido"),

  password: z
    .string("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

module.exports = {
  loginSchema,
};