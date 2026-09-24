import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  host: {
    class: 'block w-full'
  }
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
