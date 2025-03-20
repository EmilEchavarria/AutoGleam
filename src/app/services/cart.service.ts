// cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() { }

  // Agregar un artículo al carrito
  addToCart(item: any) {
    this.cartItems.push(item);
  }

  // Obtener todos los artículos del carrito
  getCartItems() {
    return this.cartItems;
  }

  // Obtener el total de artículos en el carrito
  getTotalItems() {
    return this.cartItems.length;
  }

  // Calcular el total del carrito
  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.service?.price || 0), 0);  // Aquí accedemos a item.service.price
  }

  
    getCartItemCount(): number {
      return this.cartItems.length;
    }
}
