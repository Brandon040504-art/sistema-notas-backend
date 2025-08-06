const mongoose = require("mongoose");

const estudianteSchema = new mongoose.Schema({
  nombre: String,
  matricula: String,
  notas: [
    {
      materia: String,
      calificacion: Number
    }
  ]
});

module.exports = mongoose.model("Estudiante", estudianteSchema);
