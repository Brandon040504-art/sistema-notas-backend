const express = require("express");
const router = express.Router();
const estudiantesController = require("../controllers/estudiantesController");
const { protegerRuta, verificarRoles } = require("../middlewares/authMiddleware");

router.get("/", protegerRuta, verificarRoles("admin", "profesor"), estudiantesController.obtenerEstudiantes);
router.post("/", protegerRuta, verificarRoles("admin", "profesor"), estudiantesController.agregarEstudiante);
router.delete("/:id", protegerRuta, verificarRoles("admin"), estudiantesController.eliminarEstudiante);
router.post("/:id/notas", protegerRuta, verificarRoles("admin", "profesor"), estudiantesController.agregarNota);

module.exports = router;
