const express = require("express");
const router = express.Router();

const {
  agregarComentario,
  obtenerComentarios,
} = require("../controllers/comentarioController");

// Ruta para obtener todos los comentarios
router.get("/comentarios", obtenerComentarios);

// Ruta para agregar un nuevo comentario
router.post("/comentarios", agregarComentario);

module.exports = router;
