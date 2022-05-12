import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HeaderService }                                                                     from './core/services/header.service';
import { Subscription }                                                                      from 'rxjs';

@Component ({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {

    @ViewChild ('dropdownButton')
    dropdownButton: ElementRef | undefined;

    public loading: boolean = false;

    private loadingSubscription: Subscription | undefined;

    public constructor (
        private _headerService: HeaderService
        , private _renderer: Renderer2
        , private _changeDetector: ChangeDetectorRef
    ) {
        this._headerService.setPageName (null);
    }

    ngOnDestroy (): void {
        if (this.loadingSubscription) {
            this.loadingSubscription.unsubscribe ();
        }
    }

    ngOnInit (): void {
        this.loadingSubscription = this._headerService.loading$.subscribe ((loading) => {
            this.loading = loading;
            this._changeDetector.detectChanges ();
        });
    }

}
