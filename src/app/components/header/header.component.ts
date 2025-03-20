import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CartService]
})
export class HeaderComponent implements OnInit {
  isSidebarOpen = false;
  cartCount: number = 0;
  userRole: string = 'client'; // Por defecto cliente

  
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartCount = this.cartService.getTotalItems();
    this.userRole = localStorage.getItem('userRole') || 'client';
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  addToCart() {
    this.cartCount++;
  }

  updateCartCount(): void {
    this.cartCount = this.cartService.getTotalItems();
  }
}
