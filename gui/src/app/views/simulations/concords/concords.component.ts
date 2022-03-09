import { Component, OnInit } from '@angular/core';

@Component ({
    selector: 'app-concords',
    templateUrl: './concords.component.html',
    styleUrls: [ './concords.component.scss' ]
})
export class ConcordsComponent implements OnInit {

    running: boolean = false;

    constructor () {
    }

    ngOnInit (): void {
    }

}
