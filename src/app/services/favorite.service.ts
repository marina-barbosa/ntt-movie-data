import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, arrayUnion, getDoc } from 'firebase/firestore';
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
      await setDoc(userDoc, {
        favorites: arrayUnion(movie)
      }, { merge: true });
      console.log("movie added to favorites:", movie);

      const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      localFavorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(localFavorites));
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


}
