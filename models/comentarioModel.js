// Estructura un comentario para guardar en Firestore
function crearComentarioModel({ nombre, comentario }) {
    return {
      nombre,
      comentario,
      fecha: new Date(), // Se convertirá automáticamente a Timestamp en Firestore
    };
  }
  
  module.exports = { crearComentarioModel };
  