const { z } = require("zod");

const createTaskSchema = z.object({
  title: z
    .string("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(200, "El título no puede superar los 200 caracteres"),

  description: z
    .string("La descripción debe ser un texto")
    .max(1000, "La descripción no puede superar los 1000 caracteres")
    .optional(),

});

const updateTaskSchema = z.object({
  title: z
    .string("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(200, "El título no puede superar los 200 caracteres"),

  description: z
    .string("La descripción debe ser un texto")
    .max(1000, "La descripción no puede superar los 1000 caracteres")
    .optional(),

  completed: z
    .boolean("El campo completed debe ser true o false"),

});

const taskIdSchema = z.object({
  id: z
    .string("El ID es obligatorio")
    .regex(/^\d+$/, "El ID debe ser un número válido"),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
};