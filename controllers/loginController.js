const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

let codigosVerificacion = {}; // 🔐 Sesión temporal en memoria

// ✉️ Configuración de Nodemailer con contraseña de aplicación
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Kartickets1@gmail.com",
    pass: "ofvy ajlw ioer pdfm",
  },
});

// 🔐 Generar código aleatorio
function generarCodigo() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ✅ Login y envío del código
const loginConVerificacion = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const clientesRef = admin.firestore().collection("clientes");
    const snapshot = await clientesRef.where("correo", "==", correo).limit(1).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "El correo no está registrado" });
    }

    const cliente = snapshot.docs[0].data();
    if (cliente["contraseña"] !== contrasena) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const codigo = generarCodigo();
    codigosVerificacion[correo] = {
      codigo,
      expiracion: Date.now() + 5 * 60 * 1000, // 5 minutos
    };

    await transporter.sendMail({
      from: "Autostyle App <Kartickets1@gmail.com>",
      to: correo,
      subject: "Código de verificación",
      text: `Tu código de verificación es: ${codigo}`,
    });

    res.status(200).json({ mensaje: "Código enviado al correo" });
  } catch (error) {
    console.error("❌ Error en loginConVerificacion:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ✅ Verificar código ingresado
const verificarCodigo = (req, res) => {
  const { correo, codigo } = req.body;

  const registro = codigosVerificacion[correo];

  if (!registro) {
    return res.status(400).json({ valido: false, error: "No se ha generado un código para este correo" });
  }

  if (Date.now() > registro.expiracion) {
    delete codigosVerificacion[correo];
    return res.status(400).json({ valido: false, error: "El código ha expirado" });
  }

  if (registro.codigo !== codigo) {
    return res.status(400).json({ valido: false, error: "Código incorrecto" });
  }

  // ✅ Código correcto
  delete codigosVerificacion[correo];
  return res.status(200).json({ valido: true });
};

// ✅ Exportar todo
module.exports = {
  loginConVerificacion,
  verificarCodigo,
  codigosVerificacion,
};
