import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonComponent, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() movie: any;

  getMovieDetails(imdbID: string) {
    // vou implementar depois
  }
}
