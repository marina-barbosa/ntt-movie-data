import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieDataService } from '../../services/movie-data.service';

export interface Movie {
  Title: string;
  Year: string;
  Director: string;
  imdbRating: string;
  Released: string;
  Genre: string;
  Actors: string;
  Plot: string;
  Language: string;
  Awards: string;
  Poster: string;
}

@Component({
  selector: 'app-card-movie-details',
  standalone: true,
  imports: [ButtonComponent, RouterModule, CommonModule],
  templateUrl: './card-movie-details.component.html',
  styleUrl: './card-movie-details.component.scss'
})



export class CardMovieDetailsComponent implements OnInit {
  movie: any;

  constructor(private movieDataService: MovieDataService) { }

  ngOnInit() {
    this.movieDataService.movieDetails$.subscribe((movieDetails) => {
      this.movie = movieDetails;
    });
  }

}
