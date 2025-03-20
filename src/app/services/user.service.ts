import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private totalUsersKey = 'totalUsers';
  private loggedUsersKey = 'loggedUsers';
  private activeUsersKey = 'activeUsers';
  private dailyGrowthKey = 'dailyGrowth';
  private monthlyGrowthKey = 'monthlyGrowth';
  private yearlyGrowthKey = 'yearlyGrowth';

  // La contraseña para verificación (en producción, se debería usar un sistema más seguro)
  private password: string = 'admin123';  

  constructor() {
    // Inicialización de las claves en localStorage si no existen
    if (!localStorage.getItem(this.totalUsersKey)) {
      localStorage.setItem(this.totalUsersKey, '0');
    }
    if (!localStorage.getItem(this.loggedUsersKey)) {
      localStorage.setItem(this.loggedUsersKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.activeUsersKey)) {
      localStorage.setItem(this.activeUsersKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.dailyGrowthKey)) {
      localStorage.setItem(this.dailyGrowthKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.monthlyGrowthKey)) {
      localStorage.setItem(this.monthlyGrowthKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.yearlyGrowthKey)) {
      localStorage.setItem(this.yearlyGrowthKey, JSON.stringify([]));
    }
  }

  // Verifica si un usuario es nuevo y lo registra como único
  checkAndIncrementUser(email: string): void {
    const loggedUsers = JSON.parse(localStorage.getItem(this.loggedUsersKey) || '[]');

    if (!loggedUsers.includes(email)) {
      loggedUsers.push(email);
      localStorage.setItem(this.loggedUsersKey, JSON.stringify(loggedUsers));

      const currentCount = Number(localStorage.getItem(this.totalUsersKey)) || 0;
      localStorage.setItem(this.totalUsersKey, (currentCount + 1).toString());
      
      // Actualiza el crecimiento (diario, mensual, anual)
      this.updateGrowth();
    }

    // Añade al usuario a la lista de activos
    this.addActiveUser(email);
  }

  // Obtiene el total de usuarios únicos
  getTotalUsers(): number {
    return Number(localStorage.getItem(this.totalUsersKey)) || 0;
  }

  // Añade un usuario a la lista de activos
  addActiveUser(email: string): void {
    const activeUsers = JSON.parse(localStorage.getItem(this.activeUsersKey) || '[]');
    if (!activeUsers.includes(email)) {
      activeUsers.push(email);
      localStorage.setItem(this.activeUsersKey, JSON.stringify(activeUsers));
    }
  }

  // Remueve un usuario de la lista de activos
  removeActiveUser(email: string): void {
    const activeUsers = JSON.parse(localStorage.getItem(this.activeUsersKey) || '[]');
    const updatedUsers = activeUsers.filter((user: string) => user !== email);
    localStorage.setItem(this.activeUsersKey, JSON.stringify(updatedUsers));
  }

  // Obtiene el número de usuarios activos
  getActiveUsersCount(): number {
    const activeUsers = JSON.parse(localStorage.getItem(this.activeUsersKey) || '[]');
    return activeUsers.length;
  }

  // Actualiza los datos de crecimiento (diario, mensual, anual)
  updateGrowth(): void {
    const currentDate = new Date();
    const dailyGrowth = JSON.parse(localStorage.getItem(this.dailyGrowthKey) || '[]');
    const monthlyGrowth = JSON.parse(localStorage.getItem(this.monthlyGrowthKey) || '[]');
    const yearlyGrowth = JSON.parse(localStorage.getItem(this.yearlyGrowthKey) || '[]');

    // Para el crecimiento diario (sumar 1 usuario)
    const today = currentDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    const dailyEntry = dailyGrowth.find((entry: any) => entry.date === today);
    if (dailyEntry) {
      dailyEntry.count += 1;
    } else {
      dailyGrowth.push({ date: today, count: 1 });
    }

    // Para el crecimiento mensual (sumar 1 usuario)
    const month = currentDate.toISOString().split('T')[0].slice(0, 7); // 'YYYY-MM'
    const monthlyEntry = monthlyGrowth.find((entry: any) => entry.date === month);
    if (monthlyEntry) {
      monthlyEntry.count += 1;
    } else {
      monthlyGrowth.push({ date: month, count: 1 });
    }

    // Para el crecimiento anual (sumar 1 usuario)
    const year = currentDate.getFullYear().toString(); // 'YYYY'
    const yearlyEntry = yearlyGrowth.find((entry: any) => entry.date === year);
    if (yearlyEntry) {
      yearlyEntry.count += 1;
    } else {
      yearlyGrowth.push({ date: year, count: 1 });
    }

    // Guardar los datos actualizados en localStorage
    localStorage.setItem(this.dailyGrowthKey, JSON.stringify(dailyGrowth));
    localStorage.setItem(this.monthlyGrowthKey, JSON.stringify(monthlyGrowth));
    localStorage.setItem(this.yearlyGrowthKey, JSON.stringify(yearlyGrowth));
  }

  // Obtener el crecimiento de usuarios para un periodo específico (diario, mensual, anual)
  getGrowthData(period: string): any[] {
    if (period === 'daily') {
      return JSON.parse(localStorage.getItem(this.dailyGrowthKey) || '[]');
    } else if (period === 'monthly') {
      return JSON.parse(localStorage.getItem(this.monthlyGrowthKey) || '[]');
    } else if (period === 'yearly') {
      return JSON.parse(localStorage.getItem(this.yearlyGrowthKey) || '[]');
    }
    return [];
  }

  // Verificar la contraseña (utiliza una contraseña fija para demostración)
  verifyPassword(inputPassword: string): boolean {
    return inputPassword === this.password;
  }

  // Restablecer la cuenta de usuarios y datos de crecimiento
  resetTotalUsers(): void {
    localStorage.setItem(this.totalUsersKey, '0');
    localStorage.setItem(this.loggedUsersKey, JSON.stringify([]));
    localStorage.setItem(this.activeUsersKey, JSON.stringify([]));
  }

  // Obtener el nombre del usuario
  getUserName(): string {
    return localStorage.getItem('userName') || 'No name found';  // O tomar de una API si es necesario
  }

  // Obtener el correo del usuario
  getUserEmail(): string {
    return localStorage.getItem('userEmail') || 'No email found';  // O tomar de una API si es necesario
  }
  setUserNameFromEmail(email: string): void {
    const userName = email.split('@')[0]; // Obtener la parte antes del '@' como nombre de usuario
    localStorage.setItem('userName', userName); // Guardar el nombre en localStorage
    localStorage.setItem('userEmail', email);   // Guardar el correo en localStorage
  }
}
