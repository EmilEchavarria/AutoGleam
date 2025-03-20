import { Component, NgModule } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { UserService } from '../../services/user.service'; 
import { NgModel, FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, HeaderComponent, FooterComponent, NgIf, FormsModule],  // Añadir FormsModule aquí
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export default class DashboardComponent {
  userName: string;
  userEmail: string;
  isEditing: boolean = false; 
  profileImage: string | ArrayBuffer | null = null;  // Almacenará la imagen seleccionada

  notifications = [
    { message: "¡Tu auto está listo para ser recogido!" },
    { message: "Cita de servicio programada para mañana." },
    { message: "Nueva promoción disponible para miembros premium." }
  ];

  services = [
    { id: 1, service: "Lavado de autos", date: "2024-12-05", status: "Completado" },
    { id: 2, service: "Limpieza interior", date: "2024-11-30", status: "Pendiente" },
    { id: 3, service: "Encera", date: "2024-11-25", status: "Completado" }
  ];

  constructor(private userService: UserService) {
    this.userEmail = this.userService.getUserEmail();
    this.userName = this.userEmail.split('@')[0];  
  }

  // Método para cambiar el modo de edición
  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  // Método para guardar los cambios del nombre
  saveNewName() {
    if (this.userName) {
      this.userService.setUserNameFromEmail(this.userName + '@gmail.com');
      this.toggleEditMode();  
    }
  }

  // Método para manejar la carga de imagen
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;  // Asigna la imagen seleccionada
      };
      reader.readAsDataURL(file);
    }
  }
}
