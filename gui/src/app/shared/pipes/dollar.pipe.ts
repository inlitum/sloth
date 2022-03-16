import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name: 'dollar'
})
export class DollarPipe implements PipeTransform {

    transform (value: number, ...args: unknown[]): string {
        let amount = Math.round(value * 100) / 100;
        console.log(amount);
        // TODO: Allow for other currency types
        return `$${amount}`;
    }

}
