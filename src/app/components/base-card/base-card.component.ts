import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-base-card',
  standalone: true,
  imports: [],
  templateUrl: './base-card.component.html',
  styleUrl: './base-card.component.scss'
})
export abstract class BaseCardComponent {
  @Input() movie: any;
  @Output() favoriteStatusChanged = new EventEmitter<boolean>();
  isFavorite: boolean = false;

  constructor(protected favoriteService: FavoriteService, protected authService: AuthService) { }

  protected async toggleFavorite() {
    if (this.authService.isLoggedIn()) {
      this.isFavorite ? await this.removeFromFavorites() : await this.addToFavorites();
      this.favoriteStatusChanged.emit(this.isFavorite);
    } else {
      this.showLoginToast();
    }
  }

  protected async checkIfFavorite() {
    const favorites = await this.favoriteService.getFavorites();
    this.isFavorite = this.favoriteService.checkExistsInFavorites(favorites, this.movie?.imdbID);
  }

  protected async addToFavorites() {
    if (this.movie) {
      try {
        await this.favoriteService.addFavorite({
          id: this.movie.imdbID,
          title: this.movie.Title,
          year: this.movie.Year
        });
        this.isFavorite = true;
      } catch (error) {
        console.error('Erro ao adicionar aos favoritos:', error);
      }
    }
  }

  protected async removeFromFavorites() {
    if (this.movie) {
      try {
        await this.favoriteService.removeFavorite(this.movie.imdbID);
        this.isFavorite = false;
      } catch (error) {
        console.error('Erro ao remover dos favoritos:', error);
      }
    }
  }

  protected abstract showLoginToast(): void;
}
