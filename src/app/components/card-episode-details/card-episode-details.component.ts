import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmdbService } from '../../services/api/omdb.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonComponent } from "../button/button.component";
import { ToastComponent } from "../toast/toast.component";

@Component({
  selector: 'app-card-episode-details',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink, ToastComponent],
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
  @ViewChild(ToastComponent) toast!: ToastComponent;
  toastText: string = '';

  constructor(private omdbService: OmdbService, private route: ActivatedRoute, private renderer: Renderer2) { }

  ngOnInit() {
    this.movieImdbID = this.route.snapshot.paramMap.get('movieImdbID')!;
    this.season = Number(this.route.snapshot.paramMap.get('season')!);
    this.episodeNumber = Number(this.route.snapshot.paramMap.get('episode')!);
    this.loadEpisodeDetails();

    //if (episodio) this.translateText();

    setTimeout(() => {
      this.isVisible = true;
    }, 500);
  }

  loadEpisodeDetails() {
    this.omdbService.getEpisodeDetails(this.movieImdbID, this.season, this.episodeNumber).subscribe((data) => {
      this.episode = data;
    });
  }

  toggleFavorite() {
    this.toast.go('Em desenvolvimento...', 'danger');
  }

  addToFavorites() {
    this.toast.go('Em desenvolvimento...', 'danger');
  }

  removeFromFavorites() {
    this.toast.go('Em desenvolvimento...', 'danger');
  }

  translateText() {
    this.toast.go('Desculpe, ocorreu um erro ao traduzir as informacoes. Tente novamente mais tarde.', 'danger');
  }

}
