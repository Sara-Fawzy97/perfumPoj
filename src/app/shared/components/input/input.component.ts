import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-1 w-full">
      @if (label()) {
        <label [for]="id()" class="text-xs font-semibold uppercase tracking-wider text-stone-600">
          {{ label() }}
        </label>
      }
      <div class="relative">
        <input
          [id]="id()"
          [type]="type()"
          [placeholder]="placeholder()"
          [value]="value()"
          [disabled]="disabled()"
          (input)="onInput($event)"
          class="w-full px-3.5 py-2 text-sm text-stone-900 bg-white border border-stone-300 rounded-lg placeholder-stone-400 focus:outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 disabled:bg-stone-100 disabled:cursor-not-allowed transition"
        />
      </div>
      @if (error()) {
        <span class="text-xs text-red-600">{{ error() }}</span>
      }
    </div>
  `
})
export class InputComponent {
  id = input<string>('input-' + Math.random().toString(36).substring(2, 9));
  label = input<string>('');
  type = input<string>('text');
  placeholder = input<string>('');
  value = input<string>('');
  disabled = input<boolean>(false);
  error = input<string>('');

  valueChange = output<string>();

  protected onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value);
  }
}
