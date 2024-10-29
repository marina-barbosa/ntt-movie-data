import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../components/button/button.component";
import { OmdbService } from '../../services/api/omdb.service';
import { MovieDataService } from '../../services/movie-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  favorites: { id: string, title: string, year: string }[] = [];

  constructor(private favoriteService: FavoriteService, private omdbService: OmdbService, private movieDataService: MovieDataService, private router: Router) { }

  async ngOnInit() {
    await this.loadFavorites();
  }

  async loadFavorites() {
    this.favorites = await this.favoriteService.getFavoritesFromLocalStorageOrFirebase();
  }

  async onOpen() {
    await this.loadFavorites();
  }

  async removeFavorite(movieId: string) {
    await this.favoriteService.removeFavorite(movieId);
    await this.loadFavorites();
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

}
