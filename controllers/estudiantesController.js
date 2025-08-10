const Estudiante = require("../models/Estudiante");

// Obtener todos los estudiantes (admin y profesor)
exports.obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener estudiantes" });
  }
};

// Agregar estudiante (profesor y admin)
exports.agregarEstudiante = async (req, res) => {
  const { nombre, matricula } = req.body;
  try {
    const nuevoEstudiante = new Estudiante({ nombre, matricula, notas: [] });
    await nuevoEstudiante.save();
    res.json(nuevoEstudiante);
  } catch (error) {
    res.status(500).json({ msg: "Error al agregar estudiante" });
  }
};

// Eliminar estudiante (solo admin)
exports.eliminarEstudiante = async (req, res) => {
  try {
    await Estudiante.findByIdAndDelete(req.params.id);
    res.json({ msg: "Estudiante eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar estudiante" });
  }
};

// Agregar nota a estudiante (profesor y admin)
exports.agregarNota = async (req, res) => {
  const { materia, calificacion } = req.body;
  try {
    const estudiante = await Estudiante.findById(req.params.id);
    if (!estudiante) return res.status(404).json({ msg: "Estudiante no encontrado" });

    estudiante.notas.push({ materia, calificacion });
    await estudiante.save();
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ msg: "Error al agregar nota" });
  }
};
