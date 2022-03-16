import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable ({
    providedIn: 'root'
})
export class HttpService {

    constructor (protected _httpClient: HttpClient) {
    }

    //TODO Add T variable type as an option. Automatic json => class conversion
    public post (url: string, body: any, headers: any): Observable<any> {
        return this._httpClient.post (url, body, { 'headers': headers });
    }

    public get (url: string, headers: any): Observable<any> {
        return this._httpClient.get (url, { 'headers': headers });
    }

    public put (url: string, body: any, headers: any): Observable<any> {
        return this._httpClient.put (url, body, { 'headers': headers });
    }

    public delete (url: string, headers: any): Observable<any> {
        return this._httpClient.delete (url, { 'headers': headers });
    }
}
