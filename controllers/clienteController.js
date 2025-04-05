const db = require("../firebase");
const Cliente = require("../models/clienteModel");

const agregarCliente = async (req, res) => {
    try {
        let { nombre, apellido, fechaNacimiento, celular, correo, contrasena, mascota, colorFavorito, ciudadNacimiento } = req.body;

        console.log("🚀 Datos recibidos en la API:");
        console.log("Nombre:", nombre);
        console.log("Apellido:", apellido);
        console.log("Fecha Nacimiento:", fechaNacimiento);
        console.log("Celular:", celular);
        console.log("Correo:", correo);
        console.log("Contraseña:", contrasena); // 🔥 Verificar si es null o undefined
        console.log("Mascota:", mascota);
        console.log("Color Favorito:", colorFavorito);
        console.log("Ciudad Nacimiento:", ciudadNacimiento);

        // 🔹 Permitir valores nulos en Firestore
        const nuevoCliente = {
            nombre: nombre || null,
            apellido: apellido || null,
            fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento) : null,
            celular: celular || null,
            correo: correo || null,
            contrasena: contrasena || null, // 🔹 Permitir null en contraseña
            mascota: mascota || null,
            colorFavorito: colorFavorito || null,
            ciudadNacimiento: ciudadNacimiento || null
        };

        const clienteRef = await db.collection("clientes").add(nuevoCliente);
        res.status(201).json({ id: clienteRef.id, ...nuevoCliente });
    } catch (error) {
        console.error("Error al registrar el cliente:", error);
        res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
    }
};

// Actualizar un cliente por ID
const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    await db.collection("clientes").doc(id).update(datosActualizados);
    res.json({ mensaje: "Cliente actualizado exitosamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el cliente", detalle: error.message });
  }
};

// Obtener un cliente por ID
const obtenerClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("clientes").doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const cliente = Cliente.fromFirestore(doc);
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el cliente", detalle: error.message });
  }
};


// Obtener clientes (solo celular, apellido, nombre y correo)
const obtenerClientes = async (req, res) => {
  try {
    const snapshot = await db.collection('clientes').get();
    if (snapshot.empty) {
      return res.status(404).json({ success: false, message: 'No se encontraron clientes' });
    }

    // Mapear los datos de cada cliente, solo incluyendo los campos deseados
    const clientes = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        nombre: data.nombre,
        apellido: data.apellido,
        celular: data.celular,
        correo: data.correo
      };
    });

    res.json({ success: true, clientes });
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ success: false, message: 'Error al obtener los clientes', error: error.message });
  }
};
module.exports = { agregarCliente, actualizarCliente, obtenerClientePorId, obtenerClientes };
