import { Injectable }                                                                                  from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable }                                                                                  from 'rxjs';
import { AuthService }                                                                                 from '../services/auth.service';

@Injectable ({
                 providedIn: 'root',
             })
export class AdminGuard implements CanActivate, CanActivateChild {

    constructor (
        private _authService: AuthService, private _router: Router,
    ) {}

    canActivate (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.check();
    }

    canActivateChild (
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.check();
    }

    private check(): boolean {
        if (!this._authService.isLoggedIn () || !this._authService.hasStatus()) {
            this._router.navigate ([ '' ]);
            return false;
        }

        let status = this._authService.status;

        if (status == null) {
            this._router.navigate ([ '' ]);
            return false;
        }

        if (status.hasAdminReadGroup == null || !status.hasAdminReadGroup()) {
            this._router.navigate ([ '' ]);
            return false;
        }

        return true;
    }
}
