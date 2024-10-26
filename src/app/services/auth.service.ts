import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { environment } from '../../../src/environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth(initializeApp(environment.firebaseConfig));

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logout() {
    return signOut(this.auth);
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}
