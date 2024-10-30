import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Router, RouterModule } from '@angular/router';
import { OmdbService } from '../../services/api/omdb.service';
import { MovieDataService } from '../../services/movie-data.service';
import { FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastComponent } from "../toast/toast.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonComponent, RouterModule, CommonModule, ToastComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() movie: any;
  isFavorite: boolean = false;
  @ViewChild(ToastComponent) toast!: ToastComponent;

  constructor(private omdbService: OmdbService, private router: Router, private movieDataService: MovieDataService, private favoriteService: FavoriteService, private authService: AuthService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.checkIfFavorite();
  }

  toggleFavorite() {
    if (this.authService.isLoggedIn()) {
      this.isFavorite ? this.removeFromFavorites() : this.addToFavorites();
    } else {
      this.toast.go('Por favor, faça login para adicionar aos favoritos.', 'danger');
    }
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
        this.isFavorite = true;
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
