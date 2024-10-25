import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { CardMovieDetailsComponent } from "../../components/card-movie-details/card-movie-details.component";

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardMovieDetailsComponent],
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss'
})


export class MovieDetailsPageComponent {

}
