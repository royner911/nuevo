const db = require("../firebase");
const RecuperarModel = require("../models/recuperarModel");

// 🔹 Obtener una pregunta aleatoria
const obtenerPreguntaAleatoria = async (req, res) => {
  try {
    const { correo } = req.body;

    const snapshot = await db.collection("clientes")
      .where("correo", "==", correo)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "Correo no encontrado" });
    }

    const data = snapshot.docs[0].data();

    const preguntas = ["mascota", "ciudadNacimiento", "colorFavorito"];
    const preguntaAleatoria = preguntas[Math.floor(Math.random() * preguntas.length)];
    const respuesta = data[preguntaAleatoria] || "";

    return res.status(200).json({
      correo: data.correo,
      preguntaSeguridad: preguntaAleatoria,
      respuestaSeguridad: respuesta,
    });

  } catch (error) {
    console.error("❌ Error al obtener pregunta:", error);
    return res.status(500).json({ error: "Error al obtener pregunta" });
  }
};

// 🔹 Cambiar contraseña
const cambiarContrasena = async (req, res) => {
  try {
    const { correo, nuevaContrasena } = req.body;

    const snapshot = await db.collection("clientes")
      .where("correo", "==", correo)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "Correo no encontrado" });
    }

    const docId = snapshot.docs[0].id;

    await db.collection('clientes').doc(docId).update({
        'contraseña': nuevaContrasena, // ✅ correcto (con tilde)
      });
      

    return res.status(200).json({ mensaje: "Contraseña actualizada exitosamente" });

  } catch (error) {
    console.error("❌ Error al cambiar contraseña:", error);
    return res.status(500).json({ error: "Error al cambiar la contraseña" });
  }
};

// 🔹 Validar la respuesta de seguridad
const validarRespuestaSeguridad = async (req, res) => {
    try {
      const { correo, respuestaSeguridad, preguntaSeguridad } = req.body;
  
      // Buscar al cliente por el correo
      const snapshot = await db.collection("clientes")
        .where("correo", "==", correo)
        .limit(1)
        .get();
  
      if (snapshot.empty) {
        return res.status(404).json({ error: "Correo no encontrado" });
      }
  
      const data = snapshot.docs[0].data();
      
      // Verificar si la respuesta de seguridad corresponde a la pregunta correcta
      const respuestaCorrecta = data[preguntaSeguridad];
  
      if (respuestaCorrecta === respuestaSeguridad) {
        return res.status(200).json({ mensaje: "Respuesta correcta" });
      } else {
        return res.status(400).json({ error: "Respuesta incorrecta" });
      }
  
    } catch (error) {
      console.error("❌ Error al validar respuesta:", error);
      return res.status(500).json({ error: "Error al validar la respuesta de seguridad" });
    }
  };

module.exports = {
  obtenerPreguntaAleatoria,
  cambiarContrasena,
  validarRespuestaSeguridad,
};
