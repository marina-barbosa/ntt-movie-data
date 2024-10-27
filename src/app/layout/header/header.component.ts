import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { SearchComponent } from "./search.component";
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../../containers/sidebar/sidebar.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { StarsComponent } from "../../components/stars/stars.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, SearchComponent, RouterModule, SidebarComponent, CommonModule, StarsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private authService: AuthService) { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login() {
    this.authService.loginWithGoogle()
      .then((result) => {
        console.log('Usuário logado:', result.user);
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
      });
  }

  logout() {
    this.authService.logout()
      .then(() => {
        console.log('Usuário deslogado');
      })
      .catch((error) => {
        console.error('Erro ao deslogar:', error);
      });
  }
}
