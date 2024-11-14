import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  @Input() toastText: string = '';
  @Input() type: 'success' | 'danger' | 'info' = 'danger';

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  showToast() {
    const toastElement = this.elRef.nativeElement.querySelector('.toast-custom');
    if (toastElement) {
      this.renderer.addClass(toastElement, 'show');

      setTimeout(() => {
        this.renderer.removeClass(toastElement, 'show');
      }, 8000);
    }
  }

  go(message: string, type: 'info' | 'success' | 'danger' = 'danger') {
      this.toastText = message;
      this.type = type;
      this.showToast();
  }

}
