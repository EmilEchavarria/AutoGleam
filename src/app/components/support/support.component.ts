import { FooterComponent } from './../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { ReportService } from '../../services/report-service.service';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export default class SupportComponent {  // Remove 'export default' and make sure 'SupportComponent' is declared properly.
  emailHistory: { senderEmail: string; subject: string; message: string }[] = [];
  emailData = {
    senderEmail: '',
    subject: '',
    message: '',
  };
  userName: string;
  userEmail: string;
  isEditing: boolean = false;
  selectedEmailIndex: number = -1;

  constructor(private userService: UserService, private reportService: ReportService) {
    this.userEmail = this.userService.getUserEmail();
    this.userName = this.userEmail.split('@')[0];
  }

  ngOnInit() {
    const savedEmails = localStorage.getItem('emailHistory');
    if (savedEmails) {
      try {
        this.emailHistory = JSON.parse(savedEmails);
      } catch (e) {
        console.error('Error al parsear el historial de correos:', e);
        this.emailHistory = [];
      }
    } else {
      this.emailHistory = [];
    }
  }

  sendEmail(event: Event) {
    event.preventDefault();
    if (this.emailData.subject && this.emailData.message) {
      const report = {
        senderEmail: this.userEmail,
        subject: this.emailData.subject,
        message: this.emailData.message,
      };

      this.reportService.addReport(report);

      if (this.isEditing && this.selectedEmailIndex !== -1) {
        this.emailHistory[this.selectedEmailIndex] = report;
      } else {
        this.emailHistory.push(report);
      }

      localStorage.setItem('emailHistory', JSON.stringify(this.emailHistory));
      this.resetForm();

      Swal.fire({
        icon: 'success',
        title: '¡Correo enviado con éxito!',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.'
      });
    }
  }

  deleteEmail(index: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar este correo una vez eliminado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '¡Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.emailHistory.splice(index, 1);
        localStorage.setItem('emailHistory', JSON.stringify(this.emailHistory));
        
        Swal.fire(
          '¡Eliminado!',
          'El correo ha sido eliminado.',
          'success'
        );
      }
    });
  }

  editEmail(index: number) {
    const emailToEdit = this.emailHistory[index];
    this.emailData = { ...emailToEdit };
    this.isEditing = true;
    this.selectedEmailIndex = index;
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedEmailIndex = -1;
    this.resetForm();
  }

  resetForm() {
    this.emailData = { senderEmail: '', subject: '', message: '' };
  }

  viewDetails(email: { senderEmail: string; subject: string; message: string }) {
    const modal = document.getElementById('emailDetailsModal');
    if (modal) {
      const modalBody = modal.querySelector('.modal-body');
      if (modalBody) {
        modalBody.innerHTML = `
          <p><strong>De:</strong> ${email.senderEmail}</p>
          <p><strong>Asunto:</strong> ${email.subject}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${email.message}</p>
        `;
      }
      modal.classList.add('show');
    }
  }
}
