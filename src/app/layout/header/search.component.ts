import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OmdbService } from '../../services/api/omdb.service';
import { MovieDataService } from '../../services/movie-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ButtonComponent, FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  movieTitle: string = '';
  movieData: any = null;
  selectedMovie: any = null;
  errorMessage: string = '';
  showAlert: boolean = false;

  constructor(private omdbService: OmdbService, private movieDataService: MovieDataService, private router: Router) { }

  searchMovie(): void {
    const trimmedTitle = this.movieTitle.trim();
    if (trimmedTitle) {
      this.omdbService.searchMovie(trimmedTitle).subscribe({
        next: (data) => {
          if (data?.Response === 'True') {
            //console.log(data);
            this.movieDataService.setMovies(data.Search);
            this.movieDataService.setTotalResults(parseInt(data.totalResults, 10));
            this.movieDataService.setTitle(trimmedTitle);
            this.errorMessage = '';
            this.showAlert = false;
            if (this.router.url !== '/') {
              this.router.navigate(['/']);
            }
          } else {
            this.movieDataService.setMovies([]);
            this.errorMessage = 'Nenhum filme encontrado.';
            this.showAlert = true;
            return
          }
        },
        error: () => {
          this.movieDataService.setMovies([]);
          this.errorMessage = 'Ocorreu um erro ao buscar o filme.';
          this.showAlert = true;
        },
      });
    } else {
      this.errorMessage = 'O campo título do filme esta vazio.';
      this.showAlert = true;
      this.movieDataService.setMovies([]);
    }
  }
}
