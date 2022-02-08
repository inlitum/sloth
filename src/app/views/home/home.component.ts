import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { QODQuote, QodService }                 from '../../core/services/qod.service';
import { Router }                               from '@angular/router';

@Component ({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

    qod: QODQuote | undefined;

    loaded: boolean = false;

    constructor (
        private qodService: QodService,
        private detectChange: ChangeDetectorRef,
        private router: Router) {

    }

    ngOnInit (): void {

        this.qodService.getQod ().subscribe (
            (e) => {
                this.qod    = e.contents.quotes[ 0 ];
                this.loaded = true;
                this.detectChange.detectChanges ();
            }
        );

    }

    click () {
        this.router.navigate ([ 'starts/start' ]);
    }

}
