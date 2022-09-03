import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'sloth-navbar',
    templateUrl: './sloth-navbar.component.html',
    styleUrls: ['./sloth-navbar.component.scss']
})
export class SlothNavbarComponent implements OnInit, OnDestroy {

    private _subscriptions: Subscription = new Subscription();

    public url: string | null = null;

    constructor(private _router: Router) {
    }

    ngOnInit(): void {
        let routerSub = this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.url = event.url;
            }
        })

        this._subscriptions.add(routerSub);
    }

    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }

}
