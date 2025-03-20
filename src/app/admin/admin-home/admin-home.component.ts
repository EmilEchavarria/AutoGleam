import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import UserManageComponent from '../user-manage/user-manage.component';
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";

Chart.register(...registerables); 

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [FormsModule, CommonModule, AdminsidebarComponent],
  providers: [UserService],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export default class AdminHomeComponent implements OnInit {

  ordenesPendientes: number = 45;
  ordenesCompletadas: number = 150;
  totalUsers: number = 0;
  activeUsersCount: number = 0;

  password: string = ''; 
  passwordCorrect: boolean = false; 
  passwordError: boolean = false; // 

  @ViewChild('userGrowthChart', { static: true }) userGrowthChartElement!: ElementRef;

  // Propiedad para las órdenes de los clientes
  ordenes = [
    { id: 1, cliente: 'Juan Pérez', fecha: '2024-12-01', estado: 'Pendiente' },
    { id: 2, cliente: 'María Gómez', fecha: '2024-12-02', estado: 'Completada' },
    { id: 3, cliente: 'Pedro Rodríguez', fecha: '2024-12-03', estado: 'Pendiente' },
    { id: 4, cliente: 'Ana Díaz', fecha: '2024-12-04', estado: 'Completada' },
  ];

  // Contraseña personalizada que tú puedes ajustar

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Obtener el total de usuarios y usuarios activos
    this.totalUsers = this.userService.getTotalUsers();
    this.activeUsersCount = this.userService.getActiveUsersCount();

    // Llamar a la función para crear el gráfico
    this.createChart();
  }

  // Función para crear el gráfico de crecimiento de usuarios
 createChart() {
  const ctx = this.userGrowthChartElement.nativeElement.getContext('2d');

  // Usamos los datos reales de usuarios
  const userGrowthData = [];
  const startDate = new Date('2024-12-01'); // Fecha de inicio de la muestra de datos

  // Aquí, ajustamos la fecha en cada iteración para que sea diferente
  for (let i = 0; i < 4; i++) {
    const date = new Date(startDate);  // Creación de una nueva instancia de la fecha
    date.setDate(startDate.getDate() + i);  // Aumentamos los días en cada iteración

    const dateString = date.toISOString().split('T')[0];  // Fecha en formato "YYYY-MM-DD"
    const usersAtDate = this.userService.getTotalUsers();  // Obtén el total de usuarios de tu servicio
    userGrowthData.push(usersAtDate);  // Agrega el número de usuarios al arreglo
  }

  // Crear el gráfico con los datos dinámicos
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2024-12-01', '2024-12-02', '2024-12-03', '2024-12-04'], // Fechas reales
      datasets: [
        {
          label: 'Crecimiento de Usuarios',
          data: userGrowthData, // Usamos los datos dinámicos
          borderColor: '#4e73df',
          backgroundColor: 'rgba(78, 115, 223, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Fecha',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Número de Usuarios',
          },
          min: 0, // Asegura que el eje Y empiece desde 0
        },
      },
    },
  });
}


  private adminPassword: string = 'DeleteDataUsers'; // Cambia esto por la contraseña que desees
  
  resetUserCount(): void {
    // Verifica si la contraseña ingresada es correcta
    if (this.password === this.adminPassword) {
      // Si la contraseña es correcta, reinicia el total de usuarios
      this.userService.resetTotalUsers();
      this.totalUsers = 0;
      this.activeUsersCount = 0;
      this.passwordCorrect = true;
      this.passwordError = false;
    } else {
      // Si la contraseña es incorrecta, muestra un error
      this.passwordError = true;
      this.passwordCorrect = false;
    }
  }
}
