import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  cartCount: number = 0; // Define la propiedad cartCount

  constructor(private cartService: CartService) {
    // Obtén el número de artículos en el carrito
    this.cartCount = this.cartService.getCartItemCount();
  }
}
