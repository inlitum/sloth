import { Injectable }    from '@angular/core';
import { HttpService }   from './http.service';
import { HttpClient }    from '@angular/common/http';
import { Observable }    from 'rxjs';
import { environment }   from '../../../environments/environment';
import { HeaderService } from './header.service';
import { tap }           from 'rxjs/operators';

@Injectable ({
    providedIn: 'root'
})
export class SlothBackendService extends HttpService {

    private _backendUrl = '';
    private isSetup     = false;

    constructor (protected _httpClient: HttpClient,
                 private _headerService: HeaderService) {
        super (_httpClient);
    }

    post (url: string, body: any, options: any): Observable<any> {
        if (!this.isSetup) {
            this.setup ();
        }
        this._headerService.startLoadingForKey(url);
        return super.post (this._backendUrl + url, body, options)
            .pipe(
                tap (() => {
                    this._headerService.stopLoadingForKey(url);
                }, () => {
                    this._headerService.stopLoadingForKey(url);
                })
            );
    }

    put (url: string, body: any, options: any): Observable<any> {
        if (!this.isSetup) {
            this.setup ();
        }
        this._headerService.startLoadingForKey(url);
        return super.put (this._backendUrl + url, body, options)
        .pipe(
            tap (() => {
                this._headerService.stopLoadingForKey(url);
            }, () => {
                this._headerService.stopLoadingForKey(url);
            })
        );
    }

    get (url: string, options: any): Observable<any> {
        if (!this.isSetup) {
            this.setup ();
        }
        this._headerService.startLoadingForKey(url);
        return super.get (this._backendUrl + url, options)
        .pipe(
            tap (() => {
                this._headerService.stopLoadingForKey(url);
            }, () => {
                this._headerService.stopLoadingForKey(url);
            })
        );
    }

    delete (url: string, options: any): Observable<any> {
        if (!this.isSetup) {
            this.setup ();
        }
        this._headerService.startLoadingForKey(url);
        return super.delete (this._backendUrl + url, options)
        .pipe(
            tap (() => {
                this._headerService.stopLoadingForKey(url);
            }, () => {
                this._headerService.stopLoadingForKey(url);
            })
        );
    }

    private setup () {
        this._backendUrl = environment.apiServer;
        this.isSetup     = true;
    }
}
