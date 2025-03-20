import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicesDataService {
  private servicios = [
    { titulo: 'Lavado Básico', descripcion: 'Incluye exterior e interior.', precio: 500, imagen: '' },
    { titulo: 'Lavado Premium', descripcion: 'Incluye cera y desinfección.', precio: 1000, imagen: '' }
  ];

  constructor() {}

  getServicios() {
    return this.servicios;
  }

  updateServicio(index: number, servicioActualizado: any) {
    if (index >= 0 && index < this.servicios.length) {
      this.servicios[index] = { ...servicioActualizado };
    }
  }
}
