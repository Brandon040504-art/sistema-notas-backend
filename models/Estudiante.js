const mongoose = require("mongoose");

const NotaSchema = new mongoose.Schema({
  materia: { type: String, required: true },
  calificacion: { type: Number, required: true }
});

const EstudianteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  matricula: { type: String, required: true, unique: true },
  notas: [NotaSchema]
});

module.exports = mongoose.model("Estudiante", EstudianteSchema);
