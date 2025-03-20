import { CommonModule } from '@angular/common';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export default class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  userEmail: string = ''; // Propiedad para almacenar el email del usuario
  userName: string = ''; // Propiedad para almacenar el nombre de usuario
  isEditing: boolean = false; // Propiedad para controlar el estado de edición

  constructor(private cartService: CartService, private userService: UserService) {}

  ngOnInit() {
    // Obtener los elementos del carrito y el precio total
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();

    // Obtener el email del usuario y derivar el nombre
    this.userEmail = this.userService.getUserEmail();
    this.userName = this.userEmail.split('@')[0];
  }

  // Método para eliminar un artículo
  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.totalPrice = this.cartService.getTotalPrice(); // Actualizar el total
  }
}
