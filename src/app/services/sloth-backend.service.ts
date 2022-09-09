import { HttpClient }            from '@angular/common/http';
import { Injectable }            from '@angular/core';
import { Router }                from '@angular/router';
import { isObject as _isObject } from 'lodash';
import { Observable }            from 'rxjs';
import { map, tap }              from 'rxjs/operators';
import { environment }           from '../../environments/environment';
import { Meta }                  from '../models/meta.model';
import { ModelConstructor }      from '../models/model';
import { HeaderService }         from './header.service';
import { LocalStorageService }   from './local-storage.service';

export interface ParameterMap {
    [param: string]: string | string[];
}

export class DataSet<T> {
    data: Array<T> = new Array<T> ();
    count: number  = 0;
    meta?: Meta;
}

@Injectable ({
                 providedIn: 'root',
             })
export class SlothBackendService {

    private _backendUrl = '';
    private isSetup     = false;

    returnUrl: string = '';

    constructor (protected _httpClient: HttpClient,
                 private _headerService: HeaderService,
                 private _router: Router,
                 private _localStorageService: LocalStorageService) {
    }

    post (url: string, body: any, options: ParameterMap): Observable<any> {
        if (!this.isSetup) {
            this.setup ();
        }
        this._headerService.startLoadingForKey (url);
        return this._httpClient.post (this._backendUrl + 'api/' + url, body, { 'headers': options })
                   .pipe (
                       tap (() => {
                           this._headerService.stopLoadingForKey (url);
                       }, (error: any) => {
                           this._headerService.stopLoadingForKey (url);
                           this.handleError (error);
                       }),
                   );
    }

    put (url: string, body: any, options: ParameterMap): Observable<any> {
        if (!this.isSetup) {
            this.setup ();
        }
        this._headerService.startLoadingForKey (url);
        return this._httpClient.put (this._backendUrl + 'api/' + url, body, { 'headers': options })
                   .pipe (
                       tap (() => {
                           this._headerService.stopLoadingForKey (url);
                       }, (error: any) => {
                           this._headerService.stopLoadingForKey (url);
                           this.handleError (error);
                       }),
                   );
    }

    getOne<T> (url: string, resourceType: ModelConstructor<T>, options: ParameterMap): Observable<any> {
        if (!this.isSetup) {
            this.setup ();
        }
        this._headerService.startLoadingForKey (url);
        return this._httpClient.get<T> (this._backendUrl + 'api/' + url, { 'headers': options })
                   .pipe (
                       map ((response: any) => {
                           if (!_isObject (response)) {
                               return;
                           }

                           return new resourceType (response);
                       }),
                       tap (() => {
                           this._headerService.stopLoadingForKey (url);
                       }, (error: any) => {
                           this._headerService.stopLoadingForKey (url);
                           this.handleError (error);
                       }),
                   );
    }

    getList<T> (url: string, resourceType: ModelConstructor<T>, options: ParameterMap): Observable<DataSet<T>> {
        if (!this.isSetup) {
            this.setup ();
        }
        this._headerService.startLoadingForKey (url);
        return this._httpClient.get<Array<T>> (this._backendUrl + 'api/' + url, { 'headers': options })
                   .pipe (
                       map ((response: any) => {
                           let recordCount = response['meta'].total;

                           const records: Array<T> = [];

                           response.data.forEach ((record: { [key: string]: any; }) => {
                               records.push (new resourceType (record));
                           })

                           let d: DataSet<T> = {
                               data : records,
                               count: recordCount,
                           };

                           if (response.meta) {
                               d.meta = new Meta (response.meta);
                           }

                           return d;
                       }),
                       tap (() => {
                           this._headerService.stopLoadingForKey (url);
                       }, (error: any) => {
                           this._headerService.stopLoadingForKey (url);
                           this.handleError (error);
                       }),
                   );
    }

    delete (url: string, options: any): Observable<any> {
        if (!this.isSetup) {
            this.setup ();
        }
        this._headerService.startLoadingForKey (url);
        return this._httpClient.delete (this._backendUrl + 'api/' + url, { 'headers': options })
                   .pipe (
                       tap (() => {
                           this._headerService.stopLoadingForKey (url);
                       }, (error: any) => {
                           this._headerService.stopLoadingForKey (url);
                           this.handleError (error);
                       }),
                   );
    }

    private handleError (error: any) {
        console.log (error);

        switch (error.status) {
            case 401: {
                console.log (error.status)
                this.startLogin ();
            }
        }
    }

    startLogin (url: string | null = null) {
        this.returnUrl = url ? url : this._router.url;
        this._router.navigate ([ '/login' ]);
    }

    private setup () {
        this._backendUrl = environment.apiServer;
        this.isSetup     = true;
    }
}
