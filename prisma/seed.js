require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcrypt");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const password = await bcrypt.hash("Password123", 10);

  await prisma.user.upsert({
    where: {
      email: "testbackend@example.com",
    },
    update: {
      name: "Test Backend",
      password,
      role: "USER",
    },
    create: {
      id: 11,
      name: "Test Backend",
      email: "testbackend@example.com",
      password,
      role: "USER",
    },
  });

  console.log("Usuario de pruebas creado correctamente.");
}

main()
  .catch((error) => {
    console.error("Error ejecutando el seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });