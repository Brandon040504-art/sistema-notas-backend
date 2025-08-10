const jwt = require("jsonwebtoken");

// Middleware para validar token y guardar usuario en req.user
exports.protegerRuta = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // 'Bearer token'

  if (!token) return res.status(401).json({ msg: "No token, acceso denegado" });

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodificado;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token no válido" });
  }
};

// Middleware para controlar roles
exports.verificarRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({ msg: "No tienes permisos para esta acción" });
    }
    next();
  };
};