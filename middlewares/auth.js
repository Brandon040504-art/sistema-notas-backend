import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token requerido" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Token inválido" });
    req.usuario = decoded;
    next();
  });
};

export const soloAdmin = (req, res, next) => {
  if (req.usuario.rol !== "admin") return res.status(403).json({ msg: "No autorizado" });
  next();
};

export const soloProfesor = (req, res, next) => {
  if (req.usuario.rol !== "profesor" && req.usuario.rol !== "admin")
    return res.status(403).json({ msg: "No autorizado" });
  next();
};

export const soloAlumno = (req, res, next) => {
  if (req.usuario.rol !== "alumno") return res.status(403).json({ msg: "No autorizado" });
  next();
};

