import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';  
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent {
  private loginForm = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  public form: FormGroup = this.createForm();

  private createForm(): FormGroup {
    return this.loginForm.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    if (this.form.invalid) {
      return; 
    }

    const formData = this.form.value;

    const adminCredentials = [
      {
        email: 'emilechavarria2005@gmail.com',
        password: 'MOTOMOTO',
      },
      {
        email: 'lunaabigailpolancoAdmin@gmail.com',
        password: 'MOTOMOTO',
      },
      {
        email: 'perritoverdeadmin@gmail.com',
        password: 'perritoverde',
      }
    ];

    const employeeCredentials = [
      {
        email: 'lunaabigailpolancoEmployee@gmail.com',
        password: 'MOTOMOTO',
      },
      {
        email: 'emilechavarriaEmployee@gmail.com',
        password: 'MOTOMOTO',
      },
      {
        email: 'perritoverdeemployee@gmail.com',
        password: 'perritoverde',
      }
    ];

    const isAdmin = adminCredentials.find(
      (cred) => cred.email === formData.email && cred.password === formData.password
    );

    if (isAdmin) {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userEmail', formData.email); // Guarda el correo en el localStorage
      this.router.navigate(['admin']);
    } else if (
      employeeCredentials.find(
        (cred) => cred.email === formData.email && cred.password === formData.password
      )
    ) {
      localStorage.setItem('userRole', 'employee');
      localStorage.setItem('userEmail', formData.email); // Guarda el correo en el localStorage
      this.router.navigate(['employee']);
    } else {
      localStorage.setItem('userRole', 'client');
      localStorage.setItem('userEmail', formData.email); // Guarda el correo en el localStorage
      this.userService.checkAndIncrementUser(formData.email); // Registra usuario único
      this.userService.addActiveUser(formData.email); // Marca como activo
      this.router.navigate(['home']);
    }

    this.resetForm(); 
  }

  resetForm() {
    this.form.reset();
  }
}
