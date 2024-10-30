import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { LayoutComponent } from "../../layout/layout/layout.component";
import { CardGridComponent } from '../../components/card-grid/card-grid.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, CardGridComponent, FooterComponent, LayoutComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
