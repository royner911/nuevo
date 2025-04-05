const db = require("../firebase"); // ✅ Importas Firestore ya inicializado

const VehiculoModel = require("../models/vehiculoModel");



const vehiculosRef = db.collection("vehiculos");

// 🔸 Registrar un vehículo
const registrarVehiculo = async (req, res) => {
  try {
    const data = req.body;

    // Crear instancia del modelo
    const vehiculo = new VehiculoModel(data);

    // Verificación opcional si viene el id_cliente desde el frontend
    if (!vehiculo.id_cliente) {
      return res.status(400).json({ error: "id_cliente es requerido" });
    }

    await vehiculosRef.add(vehiculo.toFirestore());
    res.status(201).json({ mensaje: "Vehículo registrado exitosamente" });
  } catch (error) {
    console.error("❌ Error al registrar vehículo:", error);
    res.status(500).json({ error: "Error al registrar vehículo" });
  }
};

// 🔸 Actualizar proceso del vehículo
const actualizarProceso = async (req, res) => {
  try {
    const { id } = req.params;
    const { proceso } = req.body;

    await vehiculosRef.doc(id).update({ proceso });
    res.status(200).json({ mensaje: "Proceso actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar proceso:", error);
    res.status(500).json({ error: "Error al actualizar proceso" });
  }
};

// 🔸 Actualizar id_cliente
const actualizarIdCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_cliente } = req.body;

    await vehiculosRef.doc(id).update({ id_cliente });
    res.status(200).json({ mensaje: "ID del cliente actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar id_cliente:", error);
    res.status(500).json({ error: "Error al actualizar id_cliente" });
  }
};

// Obtener vehículos (solo id_cliente, anio, marca, modelo, placa)
const obtenerVehiculos = async (req, res) => {
  try {
    const snapshot = await vehiculosRef.get(); // Consulta a Firestore
    if (snapshot.empty) {
      return res.status(404).json({ success: false, message: 'No se encontraron vehículos' });
    }

    // Mapeamos los documentos de Firestore a los datos deseados
    const vehiculos = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id_cliente: data.id_cliente,
        anio: data.anio,
        marca: data.marca,
        modelo: data.modelo,
        placa: data.placa,
      };
    });

    // Responder con los vehículos obtenidos
    res.json({ success: true, vehiculos });
  } catch (error) {
    console.error('❌ Error al obtener los vehículos:', error);
    res.status(500).json({ success: false, message: 'Error al obtener los vehículos', error: error.message });
  }
};

module.exports = {
  registrarVehiculo,
  actualizarProceso,
  actualizarIdCliente,
  obtenerVehiculos,
};
