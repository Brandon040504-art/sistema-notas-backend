const express = require("express");
const router = express.Router();
const Estudiante = require("../models/Estudiante");

// Crear estudiante
router.post("/", async (req, res) => {
  try {
    const nuevo = new Estudiante(req.body);
    await nuevo.save();
    res.json({ mensaje: "Estudiante creado" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear estudiante" });
  }
});

// Obtener todos los estudiantes
router.get("/", async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estudiantes" });
  }
});

// Agregar nota a estudiante
router.put("/:id/agregar-nota", async (req, res) => {
  try {
    const { materia, calificacion } = req.body;
    await Estudiante.findByIdAndUpdate(req.params.id, {
      $push: { notas: { materia, calificacion } }
    });
    res.json({ mensaje: "Nota agregada" });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar nota" });
  }
});

module.exports = router;
