import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { SearchComponent } from "./search.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
