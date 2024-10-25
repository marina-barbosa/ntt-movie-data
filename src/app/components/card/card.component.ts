import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Router, RouterModule } from '@angular/router';
import { OmdbService } from '../../services/api/omdb.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonComponent, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() movie: any;

  constructor(private omdbService: OmdbService, private router: Router) { }

  getMovieDetails(imdbID: string) {
    this.omdbService.searchMovieDetails(imdbID).subscribe({
      next: (movieDetails) => {
        localStorage.setItem('movieDetails', JSON.stringify(movieDetails));
        this.router.navigate(['/details']);
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
      }
    });
  }
}
