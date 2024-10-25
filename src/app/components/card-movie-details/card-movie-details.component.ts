import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-card-movie-details',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './card-movie-details.component.html',
  styleUrl: './card-movie-details.component.scss'
})
export class CardMovieDetailsComponent {

}
