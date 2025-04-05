const express = require("express");
const router = express.Router();
const db = require("../firebase"); // Importar la conexión a Firebase

// Obtener todos los vehículos
router.get("/vehiculos", async (req, res) => {
  try {
    const snapshot = await db.collection("vehiculos").get();
    const vehiculos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
