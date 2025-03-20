import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private serviciosKey = 'servicios';

  constructor() {}

  // Obtener los servicios desde el localStorage
  getServicios(): any[] {
    const servicios = localStorage.getItem(this.serviciosKey);
    return servicios ? JSON.parse(servicios) : [];
  }

  // Agregar un nuevo servicio
  agregarServicio(servicio: any): void {
    const servicios = this.getServicios();
    servicio.id = new Date().getTime(); // Asignar un ID único basado en la fecha
    servicios.push(servicio);
    localStorage.setItem(this.serviciosKey, JSON.stringify(servicios));
  }

  // Editar un servicio existente
  editarServicio(id: number, servicioActualizado: any): void {
    const servicios = this.getServicios();
    const index = servicios.findIndex((servicio: any) => servicio.id === id);
    if (index !== -1) {
      // Reemplaza el servicio encontrado con el servicio actualizado
      servicios[index] = { ...servicioActualizado, id }; // Mantener el ID
      localStorage.setItem(this.serviciosKey, JSON.stringify(servicios));
    }
  }

  // Eliminar un servicio
  eliminarServicio(index: number): void {
    const servicios = this.getServicios();
    servicios.splice(index, 1);
    localStorage.setItem(this.serviciosKey, JSON.stringify(servicios));
  }
}
