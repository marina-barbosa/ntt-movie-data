import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMovieDetailsComponent } from './card-movie-details.component';

describe('CardMovieDetailsComponent', () => {
  let component: CardMovieDetailsComponent;
  let fixture: ComponentFixture<CardMovieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMovieDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
