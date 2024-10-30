import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieDataService } from '../../services/movie-data.service';
import { FavoriteService } from '../../services/favorite.service';
import { TranslationService } from '../../services/translation.service';
import { AuthService } from '../../services/auth.service';
import { OmdbService } from '../../services/api/omdb.service';
import { ToastComponent } from "../toast/toast.component";

@Component({
  selector: 'app-card-movie-details',
  standalone: true,
  imports: [ButtonComponent, RouterModule, CommonModule, ToastComponent],
  templateUrl: './card-movie-details.component.html',
  styleUrl: './card-movie-details.component.scss'
})



export class CardMovieDetailsComponent implements OnInit {
  movie: any;
  isVisible: boolean = false;
  translatedPlot: string | undefined;
  translatedAwards: string | undefined;
  translatedGenre: string | undefined;
  translatedLanguage: string | undefined;
  isFavorite: boolean = false;
  @ViewChild(ToastComponent) toast!: ToastComponent;
  toastText: string = '';
  seasons: any[] = [];
  selectedSeason: number | null = null;
  episodes: any[] = [];

  constructor(
    private movieDataService: MovieDataService,
    private favoriteService: FavoriteService,
    private translationService: TranslationService,
    private authService: AuthService,
    private renderer: Renderer2,
    private omdbService: OmdbService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkIfFavorite();

    setTimeout(() => {
      this.isVisible = true;
    }, 500);

    this.movieDataService.movieDetails$.subscribe((movieDetails) => {
      this.movie = movieDetails;
      if (this.movie != undefined) {
        this.loadSeasons();
        this.translateText();
      }
    });
  }

  toggleFavorite() {
    if (this.authService.isLoggedIn()) {
      this.isFavorite ? this.removeFromFavorites() : this.addToFavorites();
    } else {
      this.toast.go('Por favor, faça login para adicionar aos favoritos.', 'danger');
    }
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
        }
      });

      this.translationService.translate(this.movie.Awards).subscribe({
        next: (response) => {
          this.translatedAwards = response.responseData.translatedText;
        }
      });

      this.translationService.translate(this.movie.Genre).subscribe({
        next: (response) => {
          this.translatedGenre = response.responseData.translatedText;
        }
      });

      this.translationService.translate(this.movie.Language).subscribe({
        next: (response) => {
          this.translatedLanguage = response.responseData.translatedText;
        },
        error: (error) => {
          console.info(error);
          this.toast.go('ERRO 429: Desculpe, ocorreu um erro ao traduzir as informacoes. Tente novamente mais tarde.', 'danger');
        }
      });
    }
  }

  loadSeasons() {
    if (this.movie.Type === 'series') {
      const totalSeasons = this.movie.totalSeasons;
      this.seasons = Array.from({ length: totalSeasons }, (_, i) => i + 1);
    }
  }

  onSeasonChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSeason = Number(selectElement.value);
    this.loadEpisodes(this.selectedSeason);
  }

  loadEpisodes(season: number) {
    this.omdbService.getSeasonDetails(this.movie.imdbID, season).subscribe((data) => {
      this.episodes = data.Episodes;
    });
  }

  onEpisodeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedEpisodeId = selectElement.value;
    this.router.navigate(['/episode', this.movie.imdbID, this.selectedSeason, selectedEpisodeId]);
  }

}



