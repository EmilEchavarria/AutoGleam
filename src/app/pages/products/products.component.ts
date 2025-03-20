import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import CatalogComponent from '../../components/catalog/catalog.component';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeaderComponent, CatalogComponent, FooterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export default class ProductsComponent {

}
