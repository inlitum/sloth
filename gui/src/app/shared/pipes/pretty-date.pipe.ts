import { Pipe, PipeTransform } from '@angular/core';
import * as moment             from 'moment';

@Pipe ({
    name: 'prettyDate'
})
export class PrettyDatePipe implements PipeTransform {

    transform (value: Date, ...args: unknown[]): string {
        return moment (value).format ('hh:mm a - d MMMM');
    }

}
