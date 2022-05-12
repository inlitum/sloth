import { Injectable }                                                                     from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable }                                                                     from 'rxjs';
import { SlothBackendService }                                                    from '../../core/services/sloth-backend.service';

@Injectable ({
    providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
    constructor (private _slothService: SlothBackendService, private _router: Router) {
    }

    canActivateChild (
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        console.log(state.url, this._slothService.isLoggedIn)

        if (this._slothService.isLoggedIn) {
            return true;
        }

        this._slothService.startLogin(state.url);

        return false;
    }

}
