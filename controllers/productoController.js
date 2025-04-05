const admin = require("firebase-admin");

// 🔹 Obtener productos desde Firestore
const obtenerProductos = async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection("productos").get();

    const productos = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        nombre: data.nombre || '',
        descripcion: data.descripcion || '',
        precio: data.precio || 0,
        cantidad: data.cantidad || 0,
        imagenUrl: data.imagenUrl || ''
      };
    });

    res.status(200).json(productos);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

module.exports = {
  obtenerProductos,
};
