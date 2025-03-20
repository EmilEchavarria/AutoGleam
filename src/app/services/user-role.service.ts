import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // Método para establecer el nombre extraído del correo
  setUserNameFromEmail(email: string): void {
    const userName = email.split('@')[0];  // Extraer la parte antes del '@'
    localStorage.setItem('userName', userName);  // Guardar el nombre en localStorage
    localStorage.setItem('userEmail', email);  // Guardar el correo electrónico en localStorage
  }

  // Método para obtener el nombre del usuario desde localStorage
  getUserName(): string {
    return localStorage.getItem('userName') || 'No name found';  // Si no hay nombre, devolver un valor por defecto
  }

  // Método para obtener el correo del usuario desde localStorage
  getUserEmail(): string {
    return localStorage.getItem('userEmail') || 'No email found';  // Si no hay email, devolver un valor por defecto
  }
}
