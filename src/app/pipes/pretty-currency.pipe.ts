import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyCurrency'
})
export class PrettyCurrencyPipe implements PipeTransform {
  transform(value: number, ...args: string[]): string {
    return '$' + (Math.round(value) * 100).toFixed(2);
  }
}
