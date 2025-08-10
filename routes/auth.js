const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);

// Opcional: Ruta para registrar usuarios, si la quieres agregar
// router.post("/register", authController.register);

module.exports = router;
