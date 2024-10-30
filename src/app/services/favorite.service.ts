import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, arrayUnion, getDoc, arrayRemove } from 'firebase/firestore';
import { environment } from '../../environments/environment.prod';

export interface Movie {
  id: string;
  title: string;
  year: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private db = getFirestore(initializeApp(environment.firebaseConfig));
  private auth = getAuth();

  public async addFavorite(movie: Movie) {
    const userDoc = await this.getUserDoc();
    if (!userDoc) {
      return;
    }

    const favorites = await this.getFavorites();

    if (!this.checkExistsInFavorites(favorites, movie.id)) {
      await setDoc(userDoc, { favorites: arrayUnion(movie) }, { merge: true });
      this.updateLocalStorage(movie, true);
    }
  }

  public checkExistsInFavorites(favorites: { id: string }[], movieId: string): boolean {
    return favorites.some((fav) => fav.id === movieId);
  }

  public async getFavorites(): Promise<Movie[]> {
    const userDoc = await this.getUserDoc();
    if (userDoc) {
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data['favorites'] || [];
      }
    }
    return [];
  }

  public async loadFavoritesToLocalStorage() {
    const favorites = await this.getFavorites();
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  public async getFavoritesFromLocalStorageOrFirebase(): Promise<Movie[]> {
    const localFavorites = localStorage.getItem('favorites');

    if (localFavorites) {
      return JSON.parse(localFavorites);
    } else {
      const favorites = await this.getFavorites();
      localStorage.setItem('favorites', JSON.stringify(favorites));
      return favorites;
    }
  }

  public async removeFavorite(movieId: string) {
    const userDoc = await this.getUserDoc();
    if (!userDoc) {
      return;
    }

    const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    const movieToRemove = localFavorites.find(
      (movie: { id: string }) => movie.id === movieId
    );

    if (movieToRemove) {

      await setDoc(userDoc, {
        favorites: arrayRemove(movieToRemove)
      }, { merge: true });

      const updatedFavorites = localFavorites.filter((movie: { id: string }) => movie.id !== movieId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  }

  private async getUserDoc() {
    const user = this.auth.currentUser;
    return user ? doc(this.db, 'users', user.uid) : null;
  }

  private updateLocalStorage(movie: Movie, add: boolean) {
    const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (add) {
      localFavorites.push(movie);
    } else {
      const updatedFavorites = localFavorites.filter((m: Movie) => m.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
    localStorage.setItem('favorites', JSON.stringify(localFavorites));
  }


}
