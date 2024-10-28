import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEpisodeDetailsComponent } from './card-episode-details.component';

describe('CardEpisodeDetailsComponent', () => {
  let component: CardEpisodeDetailsComponent;
  let fixture: ComponentFixture<CardEpisodeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEpisodeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEpisodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
