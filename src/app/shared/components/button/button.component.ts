import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [ngClass]="buttonClasses()"
      (click)="clicked.emit($event)"
    >
      @if (loading()) {
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      }
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fullWidth = input<boolean>(false);

  clicked = output<MouseEvent>();

  protected buttonClasses(): string {
    const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };

    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'bg-stone-900 text-amber-50 hover:bg-stone-800 focus:ring-stone-900 shadow-sm',
      secondary: 'bg-amber-100 text-amber-900 hover:bg-amber-200 focus:ring-amber-500',
      outline: 'border border-stone-300 text-stone-700 bg-white hover:bg-stone-50 focus:ring-stone-500',
      ghost: 'text-stone-600 hover:bg-stone-100 hover:text-stone-900 focus:ring-stone-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    };

    const widthClass = this.fullWidth() ? 'w-full' : '';

    return `${base} ${sizeClasses[this.size()]} ${variantClasses[this.variant()]} ${widthClass}`;
  }
}
