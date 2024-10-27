import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorysetComponent } from './storyset.component';

describe('StorysetComponent', () => {
  let component: StorysetComponent;
  let fixture: ComponentFixture<StorysetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorysetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorysetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
