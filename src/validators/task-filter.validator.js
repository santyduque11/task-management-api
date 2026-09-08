const { z } = require("zod");

const taskFilterSchema = z.object({
  completed: z
    .enum(
      ["true", "false"],
      "El filtro completed debe ser true o false"
    )
    .transform((value) => value === "true")
    .optional(),
});

module.exports = {
  taskFilterSchema,
};