import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-storyset',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './storyset.component.html',
  styleUrl: './storyset.component.scss'
})
export class StorysetComponent implements OnDestroy {
  currentSvgIndex = 0;
  intervalId: any;

  constructor() {
    this.intervalId = setInterval(() => {
      this.currentSvgIndex = (this.currentSvgIndex + 1) % 3;
    }, 4000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
