const jwt = require("jsonwebtoken");
const env = require("../config/env");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verificar que exista el header Authorization
  if (!authHeader) {
    const error = new Error("Token de autenticación requerido");
    error.statusCode = 401;

    return next(error);
  }

  // Verificar formato: Bearer TOKEN
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    const error = new Error("Formato de token inválido");
    error.statusCode = 401;

    return next(error);
  }

  try {
    // Verificar el JWT
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // Guardar información del usuario en la petición
    req.user = decoded;

    // Continuar hacia el controlador
    next();
  } catch (error) {
    const authError = new Error("Token inválido o expirado");
    authError.statusCode = 401;

    next(authError);
  }
};

module.exports = authenticateToken;