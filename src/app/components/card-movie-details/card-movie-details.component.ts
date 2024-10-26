import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieDataService } from '../../services/movie-data.service';
import { FavoriteService } from '../../services/favorite.service';
import { TranslationService } from '../../services/translation.service';

export interface Movie {
  imdbID: string;
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
  movie: Movie | any;
  isVisible: boolean = false;
  translatedPlot: string | undefined;
  translatedAwards: string | undefined;
  translatedGenre: string | undefined;
  translatedLanguage: string | undefined;
  isFavorite: boolean = true;

  constructor(
    private movieDataService: MovieDataService,
    private favoriteService: FavoriteService,
    private translationService: TranslationService
  ) { }

  ngOnInit() {
    this.checkIfFavorite();
    setTimeout(() => {
      this.isVisible = true;
    }, 500);

    this.movieDataService.movieDetails$.subscribe((movieDetails) => {
      this.movie = movieDetails;
      if (this.movie != undefined) {
        // this.translateText();
      }
    });
  }

  private async checkIfFavorite() {
    const favorites = await this.favoriteService.getFavorites();
    this.isFavorite = this.favoriteService.checkExistsInFavorites(favorites, this.movie.imdbID);
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

  translateText() {
    if (this.movie) {
      this.translationService.translate(this.movie.Plot).subscribe({
        next: (response) => {
          this.translatedPlot = response.responseData.translatedText;
        },
        error: (error) => {
          console.error('Erro ao traduzir o Plot:', error);
        }
      });

      this.translationService.translate(this.movie.Awards).subscribe({
        next: (response) => {
          this.translatedAwards = response.responseData.translatedText;
        },
        error: (error) => {
          console.error('Erro ao traduzir os Awards:', error);
        }
      });

      this.translationService.translate(this.movie.Genre).subscribe({
        next: (response) => {
          this.translatedGenre = response.responseData.translatedText;
        },
        error: (error) => {
          console.error('Erro ao traduzir o Gênero:', error);
        }
      });

      this.translationService.translate(this.movie.Language).subscribe({
        next: (response) => {
          this.translatedLanguage = response.responseData.translatedText;
        },
        error: (error) => {
          console.error('Erro ao traduzir a Language:', error);
        }
      });
    }
  }

}



