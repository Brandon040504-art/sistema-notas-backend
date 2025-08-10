require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Usuario = require("./models/Usuario");

async function crearAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");

    const emailAdmin = "admin@sistema.com";       // Cambia este email si quieres
    const existe = await Usuario.findOne({ email: emailAdmin });
    if (existe) {
      console.log("El usuario admin ya existe");
      process.exit(0);
    }

    const passwordPlain = "Admin1234";            // Cambia esta contraseña segura
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(passwordPlain, salt);

    const admin = new Usuario({
      nombre: "Administrador",
      email: emailAdmin,
      password: hashed,
      rol: "admin"
    });

    await admin.save();
    console.log("Usuario admin creado exitosamente");
    console.log(`Email: ${emailAdmin}`);
    console.log(`Contraseña: ${passwordPlain}`);

    process.exit(0);
  } catch (error) {
    console.error("Error creando admin:", error);
    process.exit(1);
  }
}

crearAdmin();
