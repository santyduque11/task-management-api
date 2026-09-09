const { z } = require("zod");

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL es obligatoria"),

  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET debe tener al menos 32 caracteres"),

  PORT: z.coerce
    .number()
    .int()
    .positive()
    .default(3000),
});

const env = envSchema.parse(process.env);

module.exports = env;