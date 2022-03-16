import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name: 'urlify'
})
export class UrlifyPipe implements PipeTransform {

    transform (value: string, ...args: unknown[]): string {
        return value.replace(' ', '+');
    }

}
