import { Injectable }               from '@angular/core';
import { Router }                   from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Status }                   from '../models/status.model';
import { UserSession }              from '../models/user-session.model';
import { HeaderService }            from './header.service';
import { LocalStorageService }      from './local-storage.service';
import { SlothBackendService }      from './sloth-backend.service';

@Injectable ({
                 providedIn: 'root',
             })
export class AuthService {

    public userSession$: Subject<UserSession | null> = new BehaviorSubject<UserSession | null> (null);
    private userSession: UserSession | null          = null;

    public status$: Subject<Status | null> = new BehaviorSubject<Status | null> (null);
    private _status: Status | null         = null;

    constructor (
        private _sloth: SlothBackendService,
        private _headerService: HeaderService,
        private _router: Router,
        private _localStorage: LocalStorageService
    ) { }

    get status (): Status | null {
        return this._status;
    }

    public isLoggedIn (): boolean {
        return this.userSession != null;
    }

    public hasStatus (): boolean {
        return this._status != null;
    }

    public checkForSession () {
        let jSession = this._localStorage.get ('session');
        let jStatus = this._localStorage.get ('status');

        try {
            this.userSession = JSON.parse (jSession);
            this.userSession$.next (this.userSession);
        } catch {
            console.log ('Unable to parse user session');
            this._sloth.startLogin ();
        }

        try {
            this._status = JSON.parse (jStatus);
            this.status$.next (this._status);
        } catch {
            console.log ('Unable to parse user session');
            this._sloth.startLogin ();
        }
    }

    public login (loginData: UserSession) {
        this._headerService.startLoadingForKey ('login');
        this._sloth.post ('auth/login', loginData.toHttpParams (), {})
            .subscribe ((result: UserSession) => {
                this.userSession = result;
                this.userSession$.next (result);

                this._localStorage.set ('session', JSON.stringify (result));

                this._headerService.stopLoadingForKey ('login');

                let url = '/';

                if (this._sloth.returnUrl && this._sloth.returnUrl !== '/login') {
                    url = this._sloth.returnUrl;
                }

                this._router.navigateByUrl (url);

                this.fetchStatus ();

            }, error => {
                console.log (error);
                this._headerService.stopLoadingForKey ('login');
            })
    }

    public logout () {
        this._headerService.startLoadingForKey ('logout');
        this._sloth.post ('auth/logout', {}, {})
            .subscribe (() => {
                this._headerService.stopLoadingForKey ('logout');
                this._localStorage.remove ('session');
                this._localStorage.remove ('status');

                this._router.navigate ([ 'login' ])
            }, () => {
                this._headerService.stopLoadingForKey ('logout');
            })
    }

    public fetchStatus () {~
        this._headerService.startLoadingForKey ('status');
        this._sloth.getOne ('__status', Status, {})
            .subscribe ((result: Status) => {
                this._status = result;
                this.status$.next (result);
                this._localStorage.set ('status', JSON.stringify (result));
                this._headerService.stopLoadingForKey ('status');
            }, () => {
                this._headerService.stopLoadingForKey ('status');
            })
    }

    public dirtySession () {
        this.userSession = null;
        this.userSession$.next (null);

        this._status = null;
        this.status$.next (null);

        this._localStorage.remove ('session');
    }

    public hasAdminRead (): boolean {
        if (!this.status) return false;

        console.log(this.status)

        return false;
    }


}
