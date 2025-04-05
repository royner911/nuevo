const admin = require("firebase-admin");
const serviceAccount = require("./firebaseConfig.json"); // Importa el JSON con credenciales

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Conexión a Firestore

module.exports = db;
