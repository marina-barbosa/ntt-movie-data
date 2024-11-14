import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { CardEpisodeDetailsComponent } from "../../components/card-episode-details/card-episode-details.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from '../../services/api/omdb.service';
import { LayoutComponent } from "../../layout/layout/layout.component";

@Component({
  selector: 'app-episode-details-page',
  standalone: true,
  imports: [HeaderComponent, CardEpisodeDetailsComponent, FooterComponent, LayoutComponent],
  templateUrl: './episode-details-page.component.html',
  styleUrl: './episode-details-page.component.scss'
})
export class EpisodeDetailsPageComponent {
  movieImdbID!: string;
  season!: number;
  episodeNumber!: number;
  episode: any;

  constructor(private route: ActivatedRoute, private omdbService: OmdbService) { }

  ngOnInit() {
    this.movieImdbID = this.route.snapshot.paramMap.get('movieImdbID')!;
    this.season = Number(this.route.snapshot.paramMap.get('season')!);
    this.episodeNumber = Number(this.route.snapshot.paramMap.get('episode')!);
    this.loadEpisodeDetails();
  }

  loadEpisodeDetails() {
    this.omdbService.getEpisodeDetails(this.movieImdbID, this.season, this.episodeNumber).subscribe((data) => {
      this.episode = data;
    });
  }
}
