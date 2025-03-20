import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userRoleKey = 'userRole'; // Clave para almacenar el rol

  constructor() {}

  setUserRole(role: string) {
    localStorage.setItem(this.userRoleKey, role); // Guardar rol en localStorage
  }

  getUserRole(): string {
    return localStorage.getItem(this.userRoleKey) || ''; // Obtener el rol del usuario
  }

  clearUserRole() {
    localStorage.removeItem(this.userRoleKey); // Limpiar el rol del usuario
  }
}
