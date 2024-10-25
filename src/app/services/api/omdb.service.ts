import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  private readonly apiKey = '19279a9';
  private readonly baseUrl = 'https://www.omdbapi.com/';

  constructor(private http: HttpClient) { }

  searchMovie(title: string): Observable<any> {
    // `http://www.omdbapi.com/?apiKey=[this.apiKey]&s=${title}&page=${pageIndex}` // paginado?
    // const params = { apikey: this.apiKey, t: title }; // busca apenas um
    const params = { apikey: this.apiKey, s: title };  // busca uma lista
    return this.http.get<any>(this.baseUrl, { params });
  }

  searchMovieDetails(imdbID: string): Observable<any> {
    const params = { apikey: this.apiKey, i: imdbID };  //  'i' para busca por imdbID
    return this.http.get<any>(this.baseUrl, { params });
  }
}
