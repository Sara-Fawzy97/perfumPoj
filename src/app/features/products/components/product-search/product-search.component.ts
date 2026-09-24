import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-search.component.html'
})
export class ProductSearchComponent {
  query = input<string>('');
  searchChange = output<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchChange.emit(target.value);
  }

  clear(): void {
    this.searchChange.emit('');
  }
}
