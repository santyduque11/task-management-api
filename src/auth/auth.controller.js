const prisma = require("../config/prisma");
const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({
      error: "Credenciales inválidas",
    });
  }

  if (!user.password) {
    return res.status(401).json({
      error: "Credenciales inválidas",
    });
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    return res.status(401).json({
      error: "Credenciales inválidas",
    });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({
    message: "Inicio de sesión exitoso",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = {
  login,
};