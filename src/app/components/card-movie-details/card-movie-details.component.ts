import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-movie-details',
  standalone: true,
  imports: [ButtonComponent, RouterModule, CommonModule],
  templateUrl: './card-movie-details.component.html',
  styleUrl: './card-movie-details.component.scss'
})
export class CardMovieDetailsComponent implements OnInit {
  movie: any;
  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      const movieDetails = localStorage.getItem('movieDetails');
      this.movie = movieDetails ? JSON.parse(movieDetails) : null;
      if (this.movie) {
        clearInterval(this.intervalId);
        //console.log(this.movie);
      }
    }, 500);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
