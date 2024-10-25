import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from "./components/button/button.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { CardComponent } from "./components/card/card.component";
import { CardGridComponent } from "./layout/card-grid/card-grid.component";
import { HomePageComponent } from "./containers/home-page/home-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, HeaderComponent, FooterComponent, CardComponent, CardGridComponent, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ntt-movie-data';
}
