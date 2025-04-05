class VehiculoModel {
  constructor(data) {
    this.id_cliente = data.id_cliente || null;
    this.marca = data.marca || '';
    this.modelo = data.modelo || '';
    this.anio = data.anio || '';
    this.placa = data.placa || '';
    this.proceso = data.proceso || 'recepcion'; // Valor por defecto
  }

  toFirestore() {
    return {
      id_cliente: this.id_cliente,
      marca: this.marca,
      modelo: this.modelo,
      anio: this.anio,
      placa: this.placa,
      proceso: this.proceso,
    };
  }
}

module.exports = VehiculoModel;
