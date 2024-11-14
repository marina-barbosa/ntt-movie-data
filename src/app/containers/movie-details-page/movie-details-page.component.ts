import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { CardMovieDetailsComponent } from "../../components/card-movie-details/card-movie-details.component";
import { LayoutComponent } from "../../layout/layout/layout.component";

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardMovieDetailsComponent, LayoutComponent],
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss'
})


export class MovieDetailsPageComponent {

}
