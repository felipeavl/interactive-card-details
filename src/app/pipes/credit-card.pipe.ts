import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard',
})
export class CreditCardPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      const parts = [];
      for (let i = 0; i < value.length; i++) {
        parts.push(value[i]);
        if ((i + 1) % 4 === 0) {
          parts.push(' ');
        }
      }
      return parts.join('');
    }
    return value;
  }
}
