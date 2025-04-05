class RecuperarModel {
  constructor(data) {
    this.correo = data.correo;
    this.preguntaSeguridad = data.preguntaSeguridad;
    this.respuestaSeguridad = data.respuestaSeguridad;
  }

  toFirestore() {
    return {
      correo: this.correo,
      preguntaSeguridad: this.preguntaSeguridad,
      respuestaSeguridad: this.respuestaSeguridad,
    };
  }
}

module.exports = RecuperarModel;
