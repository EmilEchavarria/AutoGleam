import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { CommentboxComponent } from '../../components/commentbox/commentbox.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ FooterComponent, CarouselComponent,CommentboxComponent,HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export default class HomeComponent {
  
}
