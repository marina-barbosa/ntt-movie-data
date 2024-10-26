import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Router, RouterModule } from '@angular/router';
import { OmdbService } from '../../services/api/omdb.service';
import { MovieDataService } from '../../services/movie-data.service';
import { FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonComponent, RouterModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() movie: any;
  isFavorite: boolean = false;

  constructor(private omdbService: OmdbService, private router: Router, private movieDataService: MovieDataService, private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.checkIfFavorite();
  }

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

  private async checkIfFavorite() {
    const favorites = await this.favoriteService.getFavorites();
    this.isFavorite = this.favoriteService.checkExistsInFavorites(favorites, this.movie.imdbID);
  }

  async removeFromFavorites() {
    if (this.movie) {
      try {
        await this.favoriteService.removeFavorite(this.movie.imdbID);
        console.log('Filme removido dos favoritos:', this.movie.Title);
        this.isFavorite = false;
      } catch (error) {
        console.error('Erro ao remover dos favoritos:', error);
      }
    }
  }

}
