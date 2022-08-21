import { Injectable }                                 from '@angular/core';
import { HttpClient }                                 from '@angular/common/http';
import { BehaviorSubject, Observable, Subject }       from 'rxjs';
import { environment }                                from '../../environments/environment';
import { HeaderService }                              from './header.service';
import { map, tap }                                   from 'rxjs/operators';
import { Router }                                     from '@angular/router';
import { LocalStorageService }                        from './local-storage.service';
import { ModelConstructor }                           from '../models/model';
import { isObject as _isObject, isArray as _isArray } from 'lodash';
import { User }                                       from '../models/user.model';
import { Meta }                                       from '../models/meta.model';

export interface ParameterMap {
    [param: string]: string | string[];
}

export class DataSet<T> {
    data: Array<T> = new Array<T>();
    count: number  = 0;
    meta?: Meta;
}

@Injectable({
                providedIn: 'root',
            })
export class SlothBackendService {

    public _isLoggedIn                   = false;
    public isLoggedIn$: Subject<boolean> = new BehaviorSubject(this._isLoggedIn);

    private _backendUrl           = '';
    private isSetup               = false;
    private _backendToken: string = '';

    private returnUrl: string = '';

    constructor (protected _httpClient: HttpClient,
                 private _headerService: HeaderService,
                 private _router: Router,
                 private _localStorageService: LocalStorageService) {
    }

    post (url: string, body: any, options: ParameterMap): Observable<any> {
        if (!this.isSetup) {
            this.setup();
        }
        this._headerService.startLoadingForKey(url);
        options['Authorization'] = `Bearer ${ this._backendToken }`;
        return this._httpClient.post(this._backendUrl + 'api/' + url, body, { 'headers': options })
                   .pipe(
                       tap(() => {
                           this._headerService.stopLoadingForKey(url);
                       }, (error: any) => {
                           this._headerService.stopLoadingForKey(url);
                           this.handleError(error);
                       }),
                   );
    }

    put (url: string, body: any, options: ParameterMap): Observable<any> {
        if (!this.isSetup) {
            this.setup();
        }
        this._headerService.startLoadingForKey(url);
        options['Authorization'] = `Bearer ${ this._backendToken }`;
        return this._httpClient.put(this._backendUrl + 'api/' + url, body, { 'headers': options })
                   .pipe(
                       tap(() => {
                           this._headerService.stopLoadingForKey(url);
                       }, (error: any) => {
                           this._headerService.stopLoadingForKey(url);
                           this.handleError(error);
                       }),
                   );
    }

    getOne<T> (url: string, resourceType: ModelConstructor<T>, options: ParameterMap): Observable<any> {
        if (!this.isSetup) {
            this.setup();
        }
        this._headerService.startLoadingForKey(url);
        options['Authorization'] = `Bearer ${ this._backendToken }`;
        return this._httpClient.get<T>(this._backendUrl + 'api/' + url, { 'headers': options })
                   .pipe(
                       map((response: any) => {
                           if (!_isObject(response)) {
                               return;
                           }

                           return new resourceType(response);
                       }),
                       tap(() => {
                           this._headerService.stopLoadingForKey(url);
                       }, (error: any) => {
                           this._headerService.stopLoadingForKey(url);
                           this.handleError(error);
                       }),
                   );
    }

    getList<T> (url: string, resourceType: ModelConstructor<T>, options: ParameterMap): Observable<DataSet<T>> {
        if (!this.isSetup) {
            this.setup();
        }
        this._headerService.startLoadingForKey(url);
        options['Authorization'] = `Bearer ${ this._backendToken }`;
        return this._httpClient.get<Array<T>>(this._backendUrl + 'api/' + url, { 'headers': options })
                   .pipe(
                       map((response: any) => {
                           let recordCount = response['meta'].total;

                           const records: Array<T> = [];

                           response.data.forEach((record: { [key: string]: any; }) => {
                               records.push(new resourceType(record));
                           })

                           let d: DataSet<T> = {
                               data : records,
                               count: recordCount,
                           };

                           if (response.meta) {
                               d.meta = new Meta(response.meta);
                           }

                           return d;
                       }),
                       tap(() => {
                           this._headerService.stopLoadingForKey(url);
                       }, (error: any) => {
                           this._headerService.stopLoadingForKey(url);
                           this.handleError(error);
                       }),
                   );
    }

    delete (url: string, options: any): Observable<any> {
        if (!this.isSetup) {
            this.setup();
        }
        this._headerService.startLoadingForKey(url);
        options['Authorization'] = `Bearer ${ this._backendToken }`;
        return this._httpClient.delete(this._backendUrl + 'api/' + url, { 'headers': options })
                   .pipe(
                       tap(() => {
                           this._headerService.stopLoadingForKey(url);
                       }, (error: any) => {
                           this._headerService.stopLoadingForKey(url);
                           this.handleError(error);
                       }),
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

    get isLoggedIn (): boolean {
        if (this._isLoggedIn) {
            return true;
        }

        return true;

        let token = this._localStorageService.get('login-token');
        if (token) {
            this._backendToken = token;
            this._isLoggedIn   = true;
            return true;
        }
        return false;
    }

    set isLoggedIn (value: boolean) {
        this._isLoggedIn = value;
    }

    startLogin (url: string | null = null) {
        this.returnUrl = url ? url : this._router.url;
        this._router.navigate([ '/login' ]);
    }

    login (loginData: User) {
        if (!this.isSetup) {
            this.setup();
        }

        // if (this.isLoggedIn || this._backendToken) {
        //     this.isLoggedIn = true;
        //
        //     // this._router.navigate ([ this.returnUrl ? this.returnUrl : '' ]).then (() => {
        //     //     this.returnUrl = '';
        //     // });
        //
        //     console.log ('Already logged in');
        //     return;
        // }

        this._headerService.startLoadingForKey('login');
        this._httpClient.post(this._backendUrl + 'auth/login', loginData.toHttpParams())
            .subscribe((result: any) => {
                this._headerService.stopLoadingForKey('login');
                this.isLoggedIn    = true;
                this._backendToken = result.token;


                // this._router.navigate ([ this.returnUrl ]).then (() => {
                //     this.returnUrl = '';
                // });
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
