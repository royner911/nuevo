const admin = require("firebase-admin");
const { crearComentarioModel } = require("../models/comentarioModel");

// 🔸 Agregar comentario
const agregarComentario = async (req, res) => {
  try {
    const { nombre, comentario } = req.body;

    if (!nombre || !comentario) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nuevoComentario = crearComentarioModel({ nombre, comentario });

    const docRef = await admin.firestore().collection("comentarios").add(nuevoComentario);

    res.status(201).json({ mensaje: "Comentario agregado", id: docRef.id });
  } catch (error) {
    console.error("❌ Error al agregar comentario:", error);
    res.status(500).json({ error: "Error interno al agregar comentario" });
  }
};

// 🔹 Obtener comentarios (ordenados por fecha descendente)
const obtenerComentarios = async (req, res) => {
  try {
    const snapshot = await admin
      .firestore()
      .collection("comentarios")
      .orderBy("fecha", "desc")
      .get();

    const comentarios = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(comentarios);
  } catch (error) {
    console.error("❌ Error al obtener comentarios:", error);
    res.status(500).json({ error: "Error al obtener comentarios" });
  }
};

module.exports = {
  agregarComentario,
  obtenerComentarios,
};
