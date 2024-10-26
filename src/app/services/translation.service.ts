import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface TranslationResponse {
  responseData: {
    translatedText: string;
  };
  responseStatus: number;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = 'https://api.mymemory.translated.net/get';

  constructor(private http: HttpClient) { }

  translate(text: string): Observable<TranslationResponse> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(text)}&langpair=en|pt`;
    return this.http.get<TranslationResponse>(url);
  }
}
