import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { OmdbService } from '../../services/api/omdb.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  favorites: { id: string, title: string, year: string }[] = [];

  constructor(private favoriteService: FavoriteService) { }

  async ngOnInit() {
    await this.loadFavorites();
  }

  async loadFavorites() {
    this.favorites = await this.favoriteService.getFavoritesFromLocalStorageOrFirebase();
  }

  async onOpen() {
    await this.loadFavorites();
  }

  async removeFavorite(movieId: string) {
    await this.favoriteService.removeFavorite(movieId);
    await this.loadFavorites();
  }

}
