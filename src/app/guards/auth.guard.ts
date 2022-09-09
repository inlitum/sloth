import { Injectable }                                                                                  from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable }                                                                                  from 'rxjs';
import { AuthService }                                                                                 from '../services/auth.service';
import { SlothBackendService }                                                                         from '../services/sloth-backend.service';

@Injectable ({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor (private _authService: AuthService, private _slothService: SlothBackendService, private _router: Router) {
    }

    canActivate (
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!this._authService.isLoggedIn()) {
            this._slothService.startLogin(state.url);
        }

        return true;
    }

    canActivateChild (
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!this._authService.isLoggedIn()) {
            this._slothService.startLogin(state.url);
        }

        return true;
    }

}
