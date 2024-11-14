import { ChangeDetectorRef, Component } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';
import { MovieDataService } from '../../services/movie-data.service';
import { StorysetComponent } from "../../components/storyset/storyset.component";
import { OmdbService } from '../../services/api/omdb.service';

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [CardComponent, CommonModule, StorysetComponent],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.scss'
})
export class CardGridComponent {
  movies: any[] = [];
  visibleCards: boolean[] = [];
  gridVisible: boolean = false;
  totalResults: number = 0;
  currentPage: number = 1;
  movieTitle: string = '';

  constructor(private movieDataService: MovieDataService, private cdr: ChangeDetectorRef, private omdbService: OmdbService,) { }

  ngOnInit(): void {
    this.movieDataService.movies$.subscribe((data) => {
      this.movies = data;
      this.resetCards();
    });

    this.movieDataService.totalResults$.subscribe((total) => {
      this.totalResults = total;
    });

    this.movieDataService.title$.subscribe((title) => {
      this.movieTitle = title; 
    });
  }

  resetCards() {
    this.visibleCards = Array(this.movies.length).fill(false);
    this.gridVisible = false;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.gridVisible = true;
      this.showCards();
    }, 200);
  }

  showCards() {
    this.visibleCards = Array(this.movies.length).fill(false);

    this.movies.forEach((_, index) => {
      const delay = 200;
      setTimeout(() => {
        this.visibleCards[index] = true;
      }, index * delay);
    });
  }

  fetchMovies(): void {
    if (this.movieTitle) {
      this.omdbService.searchPage(this.movieTitle, this.currentPage).subscribe(data => {
        if (data.Response === 'True') {
          this.movieDataService.setMovies(data.Search);
          this.movieDataService.setTotalResults(parseInt(data.totalResults, 10));
        } else {
          this.movieDataService.setMovies([]);
          this.movieDataService.setTotalResults(0);
        }
      });
    }
  }

  nextPage() {
    this.currentPage++;
    this.fetchMovies();
    this.scrollToTop();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchMovies();
      this.scrollToTop();
    }
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
