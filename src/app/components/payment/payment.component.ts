import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LocalServiceRequestService } from '../../services/service-request.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export default class PaymentComponent implements OnInit {
  total: number = 0;
  paymentForm: FormGroup;
  paymentSuccess: boolean = false;
  cartItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private localServiceRequestService: LocalServiceRequestService,
    private cartService: CartService // Inyectar el servicio del carrito
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]], // 16 dígitos
      cardName: ['', [Validators.required, Validators.minLength(3)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]], // MM/YY
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]] // 3 dígitos
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.total = +params['total'] || 0; // Asigna el total desde la URL o 0 si no está definido
    });
    this.cartItems = this.cartService.getCartItems(); // Obtiene los artículos del carrito
  }

  formatExpiryDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Elimina cualquier carácter no numérico
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`; // Inserta el '/'
    }
    input.value = value; // Actualiza el valor en tiempo real
    this.paymentForm.get('expiryDate')?.setValue(value, { emitEvent: false }); // Sin disparar eventos extra
  }

  submitPayment(): void {
    if (this.paymentForm.valid) {
      this.paymentSuccess = true; // Muestra el mensaje de éxito
      this.total = 0; // Limpia el total
      this.paymentForm.reset(); // Limpia el formulario

      // Enviar solicitud de servicio
      const purchasedServices = {
        id: Date.now(),
        cliente: 'Nombre del Cliente',
        servicios: this.cartItems, // Incluye los artículos del carrito
        fecha: new Date(),
        estado: 'Pendiente'
      };
      this.localServiceRequestService.addServiceRequest(purchasedServices);

      // Elimina los artículos del carrito

      // Elimina el parámetro 'total' de la URL
      this.router.navigate([], {
        queryParams: { total: null },
        queryParamsHandling: 'merge'
      });

      // Oculta el mensaje de éxito tras 5 segundos
      setTimeout(() => {
        this.paymentSuccess = false;
      }, 5000);
    } else {
      this.paymentSuccess = false;
    }
  }
}
