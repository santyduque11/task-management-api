const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Verificar que exista el header Authorization
    if (!authHeader) {
      return res.status(401).json({
        error: "Token de autenticación requerido",
      });
    }

    // Verificar formato: Bearer TOKEN
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        error: "Formato de token inválido",
      });
    }

    // Verificar el JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar información del usuario en la petición
    req.user = decoded;

    // Continuar hacia el controlador
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Token inválido o expirado",
    });
  }
};

module.exports = authenticateToken;