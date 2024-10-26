import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, arrayUnion, getDoc, arrayRemove } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private db = getFirestore(initializeApp(environment.firebaseConfig));
  private auth = getAuth();

  async addFavorite(movie: { id: string, title: string, year: string }) {
    const user = this.auth.currentUser;
    if (user) {
      const userDoc = doc(this.db, 'users', user.uid);
      const favorites = await this.getFavorites();

      const movieExists = favorites.some((fav: { id: string }) => fav.id === movie.id);

      if (!movieExists) {
        await setDoc(userDoc, {
          favorites: arrayUnion(movie)
        }, { merge: true });
        console.log("Filme adicionado aos favoritos:", movie);

        const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        localFavorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(localFavorites));
      } else {
        console.log("Filme já está nos favoritos:", movie);
      }
    } else {
      console.error('Usuário não está autenticado.');
    }
  }

  async getFavorites(): Promise<{ id: string, title: string, year: string }[]> {
    const user = this.auth.currentUser;
    if (user) {
      const userDoc = doc(this.db, 'users', user.uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data['favorites'] || [];
      }
    }
    return [];
  }

  async loadFavoritesToLocalStorage() {
    const favorites = await this.getFavorites();
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  async getFavoritesFromLocalStorageOrFirebase(): Promise<{ id: string, title: string, year: string }[]> {
    const localFavorites = localStorage.getItem('favorites');

    if (localFavorites) {
      return JSON.parse(localFavorites);
    } else {
      const favorites = await this.getFavorites();
      localStorage.setItem('favorites', JSON.stringify(favorites));
      return favorites;
    }
  }

  async removeFavorite(movieId: string) {
    const user = this.auth.currentUser;
    if (user) {
      const userDoc = doc(this.db, 'users', user.uid);
      const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

      const movieToRemove = localFavorites.find((movie: { id: string }) => movie.id === movieId);
  
      if (movieToRemove) {

        await setDoc(userDoc, {
          favorites: arrayRemove(movieToRemove)
        }, { merge: true });
        console.log("movie removed from favorites:", movieId);

        const updatedFavorites = localFavorites.filter((movie: { id: string }) => movie.id !== movieId);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        console.error('Filme não encontrado nos favoritos locais.');
      }
    } else {
      console.error('Usuário não está autenticado.');
    }
  }


}
