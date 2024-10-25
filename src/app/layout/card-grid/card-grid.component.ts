import { Component } from '@angular/core';
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

  constructor(private movieDataService: MovieDataService) { }

  ngOnInit(): void {
    this.movieDataService.movies$.subscribe((movies) => {
      this.movies = movies; 
      console.log(this.movies);
    });
  }
}
