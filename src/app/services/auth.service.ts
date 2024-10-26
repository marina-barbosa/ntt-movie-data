import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { environment } from '../../../src/environments/environment';
import { FavoriteService } from './favorite.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth(initializeApp(environment.firebaseConfig));

  constructor(private favoriteService: FavoriteService) { }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    console.log('Usuário logado:', result.user);
    await this.favoriteService.loadFavoritesToLocalStorage();
    return result;
  }
  

  logout() {
    return signOut(this.auth);
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}
