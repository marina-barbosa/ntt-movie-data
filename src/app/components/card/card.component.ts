import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Router, RouterModule } from '@angular/router';
import { OmdbService } from '../../services/api/omdb.service';
import { MovieDataService } from '../../services/movie-data.service';
import { FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastComponent } from "../toast/toast.component";
import { BaseCardComponent } from '../base-card/base-card.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonComponent, RouterModule, CommonModule, ToastComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent extends BaseCardComponent implements OnInit {
  @ViewChild(ToastComponent) toast!: ToastComponent;

  constructor(
    private omdbService: OmdbService,
    private router: Router,
    private movieDataService: MovieDataService,
    favoriteService: FavoriteService,
    authService: AuthService
  ) {
    super(favoriteService, authService);
  }

  ngOnInit(): void {
    this.checkIfFavorite();
  }

  protected showLoginToast() {
    this.toast.go('Por favor, faça login para adicionar aos favoritos.', 'danger');
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
