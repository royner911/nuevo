const express = require("express");
const router = express.Router();

const {
  registrarVehiculo,
  actualizarProceso,
  actualizarIdCliente,
  obtenerVehiculos,
} = require("../controllers/vehiculoController");

// 🔹 Ruta para registrar un nuevo vehículo
router.post("/vehiculos", registrarVehiculo);

// 🔹 Ruta para actualizar el proceso de un vehículo
router.put("/vehiculos/:id/proceso", actualizarProceso);

// 🔹 Ruta para actualizar el id_cliente de un vehículo
router.put("/vehiculos/:id/idcliente", actualizarIdCliente);

router.get("/vehiculos", obtenerVehiculos);

module.exports = router;
