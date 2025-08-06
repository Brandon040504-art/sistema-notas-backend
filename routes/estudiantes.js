const express = require('express');
const router = express.Router();
const Estudiante = require('../models/Estudiante');

// Obtener estudiantes
router.get('/', async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

// Crear estudiante
router.post('/', async (req, res) => {
  try {
    const nuevoEstudiante = new Estudiante(req.body);
    await nuevoEstudiante.save();
    res.status(201).json(nuevoEstudiante);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear estudiante' });
  }
});

// Agregar nota
router.post('/:id/notas', async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id);
    if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });

    estudiante.notas.push(req.body);
    await estudiante.save();
    res.json(estudiante);
  } catch (error) {
    res.status(400).json({ error: 'Error al agregar nota' });
  }
});

// Eliminar estudiante
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Estudiante.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Estudiante no encontrado' });
    res.json({ mensaje: 'Estudiante eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
});

module.exports = router;
