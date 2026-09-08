const { z } = require("zod");

const paginationSchema = z.object({
  page: z.coerce
    .number("La página debe ser un número")
    .int("La página debe ser un número entero")
    .min(1, "La página debe ser mayor o igual a 1")
    .default(1),

  limit: z.coerce
    .number("El límite debe ser un número")
    .int("El límite debe ser un número entero")
    .min(1, "El límite debe ser mayor o igual a 1")
    .max(100, "El límite no puede superar 100")
    .default(10),
});

module.exports = {
  paginationSchema,
};