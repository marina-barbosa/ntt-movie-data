import { Routes } from '@angular/router';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { MovieDetailsPageComponent } from './containers/movie-details-page/movie-details-page.component';
import { CardEpisodeDetailsComponent } from './components/card-episode-details/card-episode-details.component';
import { EpisodeDetailsPageComponent } from './containers/episode-details-page/episode-details-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'details', component: MovieDetailsPageComponent },
  { path: 'episode/:movieImdbID/:season/:episode', component: EpisodeDetailsPageComponent },
];
