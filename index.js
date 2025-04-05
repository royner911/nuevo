const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const axios = require("axios"); 
const xml2js = require("xml2js");

// Importar rutas
const vehiculoRoutes = require("./routes/vehiculoRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const loginRoutes = require("./routes/loginRoutes");
const comentarioRoutes = require("./routes/comentarioRoutes");
const productosRoutes = require("./routes/productosRoutes");
const recuperarRoutes = require("./routes/recuperarRoutes");

app.use(cors());
app.use(express.json());

// Registrar las rutas en la API
app.use("/api", vehiculoRoutes);
app.use("/api", clienteRoutes);
app.use("/api", loginRoutes);
app.use("/api", comentarioRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api", recuperarRoutes);

// Ruta para obtener el tipo de cambio del BCCR
app.get('/api/tipoCambio', async (req, res) => {
  const url = 'https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx';

  const body = `
  <soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
      <ObtenerIndicadoresEconomicos xmlns="http://ws.sdde.bccr.fi.cr">
        <Indicador>317</Indicador>  
        <FechaInicio>26/03/2025</FechaInicio>
        <FechaFinal>26/03/2025</FechaFinal>
        <Nombre>Pruebas API</Nombre>
        <SubNiveles>N</SubNiveles>
        <CorreoElectronico>asly.martinezm@gmail.com</CorreoElectronico>
        <Token>SYZ0CAZYMS</Token>
      </ObtenerIndicadoresEconomicos>
    </soap12:Body>
  </soap12:Envelope>`;

  try {
    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'application/soap+xml; charset=utf-8' },
    });

    const parser = new xml2js.Parser();
    parser.parseString(response.data, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error al parsear la respuesta del servicio' });
      }
      try {
        const tipoCambioXML = result['soap:Envelope']['soap:Body'][0]['ObtenerIndicadoresEconomicosResponse'][0]['ObtenerIndicadoresEconomicosResult'][0]['diffgr:diffgram'][0]['Datos_de_INGC011_CAT_INDICADORECONOMIC'][0]['INGC011_CAT_INDICADORECONOMIC'][0]['NUM_VALOR'][0];
        const tipoCambioValor = parseFloat(tipoCambioXML);
        return res.json({ success: true, tipoCambio: tipoCambioValor });
      } catch (parseError) {
        return res.status(500).json({ success: false, message: 'Error al procesar la respuesta XML' });
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
