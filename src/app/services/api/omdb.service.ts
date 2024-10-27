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
    const params = { apikey: this.apiKey, s: title };
    return this.http.get<any>(this.baseUrl, { params });
  }
  searchPage(title: string, page: number): Observable<any> {
    const params = { apikey: this.apiKey, s: title, page: page };
    return this.http.get<any>(this.baseUrl, { params });
  }
  
  searchMovieDetails(imdbID: string): Observable<any> {
    const params = { apikey: this.apiKey, i: imdbID };
    return this.http.get<any>(this.baseUrl, { params });
  }
}
