import { ChangeDetectorRef, Component } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';
import { MovieDataService } from '../../services/movie-data.service';

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.scss'
})
export class CardGridComponent {
  movies: any[] = [];
  visibleCards: boolean[] = [];
  gridVisible: boolean = false;

  constructor(private movieDataService: MovieDataService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.movieDataService.movies$.subscribe((movies) => {
      this.movies = movies;
      this.resetCards();
      // console.log(this.movies);
    });
  }

  resetCards() {
    this.visibleCards = Array(this.movies.length).fill(false);
    this.gridVisible = false;
    this.cdr.detectChanges(); 

    setTimeout(() => {
      this.gridVisible = true; 
      this.showCards(); 
    }, 300); 
  }

  showCards() {
    this.visibleCards = Array(this.movies.length).fill(false);

    this.movies.forEach((_, index) => {
      // const delay = index === 0 ? 3000 : 300;
      const delay = 200;
      setTimeout(() => {
        this.visibleCards[index] = true;
      }, index * delay);
    });
  }
}
