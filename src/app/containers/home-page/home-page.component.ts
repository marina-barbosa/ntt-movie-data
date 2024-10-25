import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { CardGridComponent } from "../../layout/card-grid/card-grid.component";
import { FooterComponent } from "../../layout/footer/footer.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, CardGridComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
