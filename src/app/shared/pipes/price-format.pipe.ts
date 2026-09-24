import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appPriceFormat',
  standalone: true
})
export class PriceFormatPipe implements PipeTransform {
  transform(value: number | null | undefined, currencySymbol = '$'): string {
    if (value === null || value === undefined || isNaN(value)) {
      return `${currencySymbol}0.00`;
    }
    return `${currencySymbol}${value.toFixed(2)}`;
  }
}
