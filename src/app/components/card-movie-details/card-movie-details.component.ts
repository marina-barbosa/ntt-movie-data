import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-movie-details',
  standalone: true,
  imports: [ButtonComponent, RouterModule],
  templateUrl: './card-movie-details.component.html',
  styleUrl: './card-movie-details.component.scss'
})
export class CardMovieDetailsComponent {

}
