import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmdbService } from '../../services/api/omdb.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-card-episode-details',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink],
  templateUrl: './card-episode-details.component.html',
  styleUrls: ['./card-episode-details.component.scss']
})
export class CardEpisodeDetailsComponent implements OnInit {
  movieImdbID!: string;
  season!: number;
  episodeNumber!: number;
  episode: any;
  isVisible: boolean = false; 
  isFavorite: boolean = false; 
  @ViewChild('loginToast', { static: false }) loginToast!: ElementRef; 
  toastText: string = '';

  constructor(private omdbService: OmdbService, private route: ActivatedRoute, private renderer: Renderer2) {}

  ngOnInit() {
    this.movieImdbID = this.route.snapshot.paramMap.get('movieImdbID')!;
    this.season = Number(this.route.snapshot.paramMap.get('season')!);
    this.episodeNumber = Number(this.route.snapshot.paramMap.get('episode')!);
    this.loadEpisodeDetails();

    setTimeout(() => {
      this.isVisible = true;
    }, 500);
  }

  loadEpisodeDetails() {
    this.omdbService.getEpisodeDetails(this.movieImdbID, this.season, this.episodeNumber).subscribe((data) => {
      this.episode = data;
      console.log("loadEpisodeDetails - episode: ", this.episode);
    });
  }

  toggleFavorite() {
    // if (this.isFavorite) {
    //   this.removeFromFavorites();
    // } else {
    //   this.addToFavorites();    
    // }
    this.showToast('Em desenvolvimento...');
  }

  addToFavorites() {
    // console.log('Episódio adicionado aos favoritos:', this.episode.Title);
    // this.isFavorite = true;
    this.showToast('Em desenvolvimento...');
  }

  removeFromFavorites() {
    // console.log('Episódio removido dos favoritos:', this.episode.Title);
    // this.isFavorite = false;
    this.showToast('Em desenvolvimento...');
  }

  showToast(message: string) {
    this.toastText = message;
    this.renderer.addClass(this.loginToast.nativeElement, 'show');
    
    setTimeout(() => {
      this.renderer.removeClass(this.loginToast.nativeElement, 'show');
      this.toastText = '';
    }, 4000);
  }
}
