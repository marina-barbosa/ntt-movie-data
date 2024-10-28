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

  private totalResultsSubject = new BehaviorSubject<number>(0);
  totalResults$ = this.totalResultsSubject.asObservable();

  setTotalResults(totalResults: number) {
    this.totalResultsSubject.next(totalResults);
  }

  private movieDetailsSubject = new BehaviorSubject<any>(null);
  movieDetails$ = this.movieDetailsSubject.asObservable();

  setMovieDetails(movieDetails: any) {
    this.movieDetailsSubject.next(movieDetails);
  }

  private titleSubject = new BehaviorSubject<string>('');
  title$ = this.titleSubject.asObservable();

  setTitle(title: string) {
    this.titleSubject.next(title);
  }
}
