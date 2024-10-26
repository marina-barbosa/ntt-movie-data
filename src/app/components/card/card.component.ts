import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Router, RouterModule } from '@angular/router';
import { OmdbService } from '../../services/api/omdb.service';
import { MovieDataService } from '../../services/movie-data.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonComponent, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() movie: any;

  constructor(private omdbService: OmdbService, private router: Router, private movieDataService: MovieDataService, private favoriteService: FavoriteService) { }

  getMovieDetails(imdbID: string) {
    this.omdbService.searchMovieDetails(imdbID).subscribe({
      next: (movieDetails) => {
        this.movieDataService.setMovieDetails(movieDetails);
        this.router.navigate(['/details']);
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
      }
    });
  }

  async addToFavorites() {
    if (this.movie) {
      try {
        await this.favoriteService.addFavorite({
          id: this.movie.imdbID,
          title: this.movie.Title,
          year: this.movie.Year
        });
        console.log('Filme adicionado aos favoritos:', this.movie.Title);
      } catch (error) {
        console.error('Erro ao adicionar aos favoritos:', error);
      }
    }
  }

}
