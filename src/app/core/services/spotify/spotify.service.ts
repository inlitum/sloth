import { Injectable }   from '@angular/core';
import { HttpService }  from '../http.service';
import { environment }  from '../../../../environments/environment';
import { SpotifyAuth }  from '../../types/spotify.auth';
// @ts-ignore
import * as querystring from 'querystring';

@Injectable ({
    providedIn: 'root'
})
export class SpotifyService {

    private loginUrl: string    = 'https://accounts.spotify.com/authorize?';
    private baseUrl: string     = 'https://api.spotify.com/v1/me';
    private clientId: string    = '';
    private callbackUrl: string = '';

    private loginState: SpotifyAuth | undefined;

    constructor (private _httpService: HttpService) {
        this.clientId    = environment.spotifyClientId;
        this.callbackUrl = environment.spotifyCallbackUrl;
    }

    public getPlaybackState () {

        if (!this.loginState) {
            this.login ();
        }

    }

    public login () {

        //TODO generate state to check the request is valid
        var scope = 'user-read-currently-playing';

        let url = this.loginUrl + querystring.stringify ({
            response_type: 'code',
            client_id: this.clientId,
            scope: scope,
            redirect_uri: this.callbackUrl
        });

        window.location.href = url;

    }

    public setLoginState (loginState: SpotifyAuth) {
        this.loginState = loginState;
    }

}
