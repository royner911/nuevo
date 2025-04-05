const express = require("express");
const router = express.Router();
const { agregarCliente, actualizarCliente, obtenerClientePorId, obtenerClientes } = require("../controllers/clienteController");

// Ruta para agregar un nuevo cliente
router.post("/clientes", agregarCliente);

// Ruta para actualizar un cliente por ID
router.put("/clientes/:id", actualizarCliente);

// Ruta para obtener un cliente por ID
router.get("/clientes/:id", obtenerClientePorId);

// Nueva ruta para obtener los clientes (con los campos celular, apellido, nombre y correo)
router.get('/clientes', obtenerClientes);

module.exports = router;
