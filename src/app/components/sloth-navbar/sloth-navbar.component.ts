import { Component, OnInit } from '@angular/core';
import { Subscription }      from 'rxjs';
import { UserSession }       from '../../models/user-session.model';
import { AuthService }       from '../../services/auth.service';

@Component ({
                selector   : 'sloth-navbar',
                templateUrl: './sloth-navbar.component.html',
                styleUrls  : [ './sloth-navbar.component.scss' ],
            })
export class SlothNavbarComponent implements OnInit {

    private subscription: Subscription = new Subscription ();

    public userSession: UserSession | null = null;

    constructor (
        private _auth: AuthService,
    ) { }

    ngOnInit (): void {
        let userSessionSub = this._auth.userSession$.subscribe (session => {
            this.userSession = session;
        })

        this.subscription.add (userSessionSub);
    }

    logout() {
        this._auth.logout();
    }
}
