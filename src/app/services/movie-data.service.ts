import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  private movieSubject = new BehaviorSubject<any[]>([]);
  movies$ = this.movieSubject.asObservable();

  setMovies(movies: any[]) {
    this.movieSubject.next(movies);
  }

  private movieDetailsSubject = new BehaviorSubject<any>(null);
  movieDetails$ = this.movieDetailsSubject.asObservable();

  setMovieDetails(movieDetails: any) {
    this.movieDetailsSubject.next(movieDetails);
  }
}
