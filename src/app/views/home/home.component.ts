import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router }                               from '@angular/router';

export interface Link {
    prefix: string,
    link: string,
    text: string
}

@Component ({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
    pages: Link[] = [
        {
            prefix: 'srt',
            link: '/starts/start',
            text: 'spooky skeleton'
        },
        {
            prefix: 'srt',
            link: '/starts/notes',
            text: 'notes'
        },
        {
            prefix: 'srt',
            link: '/starts/memex',
            text: 'memex'
        },
        {
            prefix: 'sim',
            link: '/sims/concords',
            text: 'concords'
        }
    ]

    showModal: boolean = true;

    constructor (
        private detectChange: ChangeDetectorRef,
        private router: Router) {

    }

    ngOnInit (): void {
    }

    click () {
        this.showModal = true;
    }

}
