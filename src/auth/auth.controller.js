const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos obligatorios
    if (!email || !password) {
      return res.status(400).json({
        error: "El email y la contraseña son obligatorios",
      });
    }

    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // No revelar si el email existe o no
    if (!user) {
      return res.status(401).json({
        error: "Credenciales inválidas",
      });
    }

    // Comparar contraseña con el hash almacenado
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

    // Generar token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Responder sin contraseña
    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al iniciar sesión",
    });
  }
};

module.exports = {
  login,
};