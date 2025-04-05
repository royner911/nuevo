class Cliente {
    constructor(id, nombre, apellido, fechaNacimiento, celular, correo, contrasena, mascota, colorFavorito, ciudadNacimiento) {
      this.id = id || null;
      this.nombre = nombre;
      this.apellido = apellido;
      this.fechaNacimiento = fechaNacimiento;
      this.celular = celular;
      this.correo = correo;
      this.contrasena = contrasena;
      this.mascota = mascota || null;           
      this.colorFavorito = colorFavorito || null;
      this.ciudadNacimiento = ciudadNacimiento || null;
    }
  
    // Convertir objeto a formato Firestore
    toFirestore() {
      return {
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento, // Firestore acepta Date
        celular: this.celular,
        correo: this.correo,
        contrasena: this.contrasena,
        mascota: this.mascota,
        colorFavorito: this.colorFavorito,
        ciudadNacimiento: this.ciudadNacimiento,
      };
    }
  
    // Convertir documento de Firestore a ClienteModel
    static fromFirestore(doc) {
      const data = doc.data();
      return new Cliente(
        doc.id,
        data.nombre,
        data.apellido,
        data.fechaNacimiento.toDate(), // Convertir Timestamp a Date
        data.celular,
        data.correo,
        data.contrasena,
        data.mascota,
        data.colorFavorito,
        data.ciudadNacimiento
      );
    }
  }
  
  module.exports = Cliente;
  