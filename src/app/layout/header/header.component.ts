import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { SearchComponent } from "./search.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, SearchComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
