const express = require("express");
const router = express.Router();

const {
  loginConVerificacion,
  verificarCodigo, // <-- esta línea es la que faltaba
} = require("../controllers/loginController");

router.post("/login", loginConVerificacion);
router.post("/verificar-codigo", verificarCodigo); // <-- ahora sí puedes usarla

module.exports = router;
