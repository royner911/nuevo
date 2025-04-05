const express = require("express");
const router = express.Router();

const {
  obtenerPreguntaAleatoria,
  cambiarContrasena,
    validarRespuestaSeguridad,
} = require("../controllers/recuperarController");

// 🔹 Ruta para obtener una pregunta de seguridad aleatoria
router.post("/recuperar/pregunta", obtenerPreguntaAleatoria);

// 🔹 Ruta para actualizar la contraseña
router.put("/recuperar/contrasena", cambiarContrasena);

// 🔹 Ruta para validar la respuesta de seguridad
router.post("/recuperar/validar-respuesta", validarRespuestaSeguridad);


module.exports = router;
