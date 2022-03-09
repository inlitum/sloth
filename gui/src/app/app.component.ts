import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { HeaderService }                                                         from './core/services/header.service';
import { Subject, Subscription } from 'rxjs';

export interface Page {
    icon: string,
    link: string,
    tooltip?: string,
    weight?: number
}

@Component ({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnDestroy{

    @ViewChild('dropdownButton')
    dropdownButton: ElementRef | undefined;

    public loading: boolean = false;

    private loadingSubscription: Subscription | undefined;

    pages: Page[] = [
        {
            icon: 'fa-house',
            link: '',
            tooltip: 'The default page that gets shown'
        },
        {
            icon: 'fa-brain',
            link: 'pages/knowledge',
            tooltip: 'Knowledge base.'
        }
    ];

    public constructor (
        private _headerService: HeaderService
        , private _renderer: Renderer2
    ) {
        this._headerService.setPageName (null);

        this.loadingSubscription = this._headerService.loading$.subscribe((loading) => {
            this.loading = loading;
        })
    }

    ngOnDestroy (): void {
        if (this.loadingSubscription) {
            this.loadingSubscription.unsubscribe();
        }
    }

}
