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
}
