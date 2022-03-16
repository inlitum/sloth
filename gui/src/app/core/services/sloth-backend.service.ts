import { Injectable }                           from '@angular/core';
import { HttpService }                          from './http.service';
import { HttpClient, HttpHeaders }              from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment }                          from '../../../environments/environment';
import { HeaderService }                        from './header.service';
import { tap }                                  from 'rxjs/operators';
import { SlothUser }                            from '../types/user.data';
import { Router }                               from '@angular/router';
import { LocalStorageService }                  from './local-storage.service';

@Injectable ({
    providedIn: 'root'
})
export class SlothBackendService extends HttpService {


    public _isLoggedIn = false;
    public isLoggedIn$: Subject<boolean> = new BehaviorSubject(this._isLoggedIn);

    private _backendUrl = '';
    private isSetup     = false;
    private _backendToken: string = '';

    private returnUrl: string = '';

    constructor (protected _httpClient: HttpClient,
                 private _headerService: HeaderService,
                 private _router: Router,
                 private _localStorageService: LocalStorageService) {
        super (_httpClient);
    }

    post (url: string, body: any, options: any): Observable<any> {
        if (!this.isSetup) {
            this.setup ();
        }
        this._headerService.startLoadingForKey(url);
        options['Authorization'] = `Bearer ${this._backendToken}`;
        return super.post (this._backendUrl + 'api/' + url, body, options)
            .pipe(
                tap (() => {
                    this._headerService.stopLoadingForKey(url);
                }, (error: any) => {
                    this._headerService.stopLoadingForKey(url);
                    this.handleError(error);
                })
            );
    }

    put (url: string, body: any, options: any): Observable<any> {
        if (!this.isSetup) {
            this.setup ();
        }
        this._headerService.startLoadingForKey(url);
        options['Authorization'] = `Bearer ${this._backendToken}`;
        return super.put (this._backendUrl + 'api/' + url, body, options)
        .pipe(
            tap (() => {
                this._headerService.stopLoadingForKey(url);
            }, (error: any) => {
                this._headerService.stopLoadingForKey(url);
                this.handleError(error);
            })
        );
    }

    get (url: string, options: any): Observable<any> {
        if (!this.isSetup) {
            this.setup ();
        }
        this._headerService.startLoadingForKey(url);
        options['Authorization'] = `Bearer ${this._backendToken}`;
        return super.get (this._backendUrl + 'api/' + url, options)
        .pipe(
            tap (() => {
                this._headerService.stopLoadingForKey(url);
            }, (error: any) => {
                this._headerService.stopLoadingForKey(url);
                this.handleError(error);
            })
        );
    }

    delete (url: string, options: any): Observable<any> {
        if (!this.isSetup) {
            this.setup ();
        }
        this._headerService.startLoadingForKey(url);
        options['Authorization'] = `Bearer ${this._backendToken}`;
        return super.delete (this._backendUrl + 'api/' + url, options)
        .pipe(
            tap (() => {
                this._headerService.stopLoadingForKey(url);
            }, (error: any) => {
                this._headerService.stopLoadingForKey(url);
                this.handleError(error);
            })
        );
    }

    private handleError (error: any) {
        console.log(error);

        switch (error.status) {
            case 401: {
                // Unauthorized;
                this._backendToken = '';
                this._localStorageService.set('login-token', null);
                this.isLoggedIn = false;
                this.isLoggedIn$.next(this.isLoggedIn);

                this.startLogin();
            }
        }
    }

    get isLoggedIn(): boolean {
        if (this._isLoggedIn) {
            return true;
        }

        let token = this._localStorageService.get('login-token');
        if (token) {
            this._backendToken = token;
            this._isLoggedIn = true;
            return true;
        }
        return false;
    }

    set isLoggedIn(value: boolean) {
        this._isLoggedIn = value;
    }

    startLogin (url: string | null = null) {
        this.returnUrl = url ? url : this._router.url;
        this._router.navigate(['/login']);
    }

    login ( loginData: SlothUser ) {
        if (!this.isSetup) {
            this.setup();
        }

        let lToken = this._localStorageService.get('login-token');

        if (!this._backendToken && lToken) {
            this._backendToken = lToken;
        }

        if (this.isLoggedIn || this._backendToken) {
            this.isLoggedIn = true;

            this._router.navigate([this.returnUrl ? this.returnUrl : '']).then(() => {
                this.returnUrl = '';
            })

            console.log('Already logged in')
            return;
        }

        this._headerService.startLoadingForKey('login');
        super.post(this._backendUrl + 'login', loginData, new HttpHeaders())
            .subscribe((result) => {
                this._headerService.stopLoadingForKey('login');
                this.isLoggedIn = true;
                this._backendToken = result.token;

                this._localStorageService.set('login-token', result.token);

                this._router.navigate([this.returnUrl]).then(() => {
                    this.returnUrl = '';
                });
            }, () => {
                this._headerService.stopLoadingForKey('login');
            });
    }

    logout () {
        this._backendToken = '';
        this._localStorageService.set('login-token', null);
        this.isLoggedIn = false;
    }

    private setup () {
        this._backendUrl = environment.apiServer;
        this.isSetup     = true;
    }
}
