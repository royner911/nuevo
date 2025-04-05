const express = require('express');
const router = express.Router();
const { obtenerProductos } = require('../controllers/productoController');

router.get('/', obtenerProductos); // ✅ Esto ahora será /api/productos

module.exports = router;
