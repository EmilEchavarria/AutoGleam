import { HeaderComponent } from './../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from "../footer/footer.component";
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [FooterComponent,HeaderComponent,FooterComponent,RouterModule, ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
