import { Routes } from '@angular/router';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { MovieDetailsPageComponent } from './containers/movie-details-page/movie-details-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'details', component: MovieDetailsPageComponent }
];
