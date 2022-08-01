import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  SlothBackendService
} from '../services/sloth-backend.service';

@Injectable( {
               providedIn: 'root',
             } )
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor (
    private _slothService: SlothBackendService, private _router: Router
  ) {}

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this._slothService.isLoggedIn) {
      return true;
    }

    this._router.navigate([''])

    return false;
  }

  canActivateChild (
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this._slothService.isLoggedIn) {
      return true;
    }

    this._router.navigate([''])

    return false;
  }

}
