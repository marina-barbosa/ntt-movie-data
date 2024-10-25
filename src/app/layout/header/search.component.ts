import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OmdbService } from '../../services/api/omdb.service';
import { MovieDataService } from '../../services/movie-data.service';

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

  constructor(private omdbService: OmdbService, private movieDataService: MovieDataService) { }

  searchMovie(): void {
    const trimmedTitle = this.movieTitle.trim();
    if (trimmedTitle) {
      this.omdbService.searchMovie(trimmedTitle).subscribe({
        next: (data) => {
          if (data?.Response === 'True') {
            //console.log(data);
            this.movieDataService.setMovies(data.Search);
            this.errorMessage = '';
          } else {
            this.movieDataService.setMovies([]);
            this.errorMessage = 'Filme não encontrado!';
          }
        },
        error: () => {
          this.movieDataService.setMovies([]);
          this.errorMessage = 'Ocorreu um erro ao buscar o filme!';
        },
      });
    } else {
      this.errorMessage = 'O título do filme não pode estar vazio!';
      this.movieDataService.setMovies([]);
    }
  }
}
