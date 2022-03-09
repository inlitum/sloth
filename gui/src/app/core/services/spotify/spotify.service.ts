import { Injectable }                           from '@angular/core';
import { HttpService }                          from '../http.service';
import { environment }                          from '../../../../environments/environment';
import { SpotifyAuth }                          from '../../types/spotify.auth';
import { Router }                               from '@angular/router';
import { LocalStorageService }                  from '../local-storage.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpHeaders }                          from '@angular/common/http';
import { finalize }                             from 'rxjs/operators';
import { PlayerState }                          from '../../types/spotify.types';

@Injectable ({
    providedIn: 'root'
})
export class SpotifyService {

    public onAuth$: Subject<boolean> = new BehaviorSubject<boolean> (false);

    public userSession: SpotifyAuth | undefined;

    public currentPlayerState: PlayerState | undefined;

    public userSession$: Subject<SpotifyAuth | null> = new BehaviorSubject<SpotifyAuth | null> (null);

    public currentPlayerState$: Subject<PlayerState | null> = new BehaviorSubject<PlayerState | null> (null);

    private _spotifyLoginUrl: string     = 'https://accounts.spotify.com';
    private _spotifyApiUrl: string       = 'https://api.spotify.com/v1/me';
    private _spotifyClientId: string     = '';
    private _spotifyClientSecret: string = '';
    private _spotifyScope: string        = '';
    private _redirectUrl: string         = '';

    private _isLoggingIn: boolean = false;

    constructor (private _httpService: HttpService, private router: Router, private _localStorageService: LocalStorageService) {
        this._spotifyClientId     = environment.spotifyClientId;
        this._spotifyClientSecret = environment.spotifyClientSecret;
        this._spotifyScope        = environment.spotifyScope;
        this._redirectUrl         = environment.spotifyCallbackUrl;
    }

    public beginLogin (): void {
        if (this._isLoggingIn) {
            return;
        }

        this._localStorageService.set ('return-url', this.router.url);

        this._isLoggingIn = true;

        if (this.isAuthenticated ()) {
            this._isLoggingIn = false;
            return;
        }

        location.href = this._spotifyLoginUrl + '/authorize'
            + '?client_id=' + encodeURIComponent (this._spotifyClientId)
            + '&response_type=' + encodeURIComponent ('code')
            + '&scope=' + encodeURIComponent (this._spotifyScope)
            + '&redirect_uri=' + encodeURIComponent (this._redirectUrl);
    }

    public completeOAuthLogin (code: string): Observable<SpotifyAuth> {
        let url = this._spotifyLoginUrl + '/api/token'
            + '?code=' + encodeURIComponent (code)
            + '&redirect_uri=' + encodeURIComponent (this._redirectUrl)
            + '&grant_type=' + encodeURIComponent ('authorization_code');

        return this.handleSpotifyAuthRequest (this._httpService.post (url, null, {
            headers: {
                'Authorization': `Basic ${btoa (this._spotifyClientId + ':' + this._spotifyClientSecret)}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }));
    }

    public handleSpotifyAuthRequest (request: Observable<Object>): Observable<SpotifyAuth> {
        return new Observable<SpotifyAuth> (
            observable => {
                request.pipe (
                    finalize (() => this._isLoggingIn = false)
                ).subscribe (
                    res => {
                        this.userSession = this.parseSpotifyResponse (res);

                        observable.next (this.userSession);
                        observable.complete ();

                        this.userSession$.next (this.userSession);
                        this.onAuth$.next (this.userSession?.authenticated);
                    }
                );
            }
        );
    }

    public parseSpotifyResponse (authData: any): SpotifyAuth {
        const s: SpotifyAuth = new SpotifyAuth ();
        if (!authData) {
            s.error = 'Um....';
        } else if (!authData[ 'access_token' ]) {
            s.error = authData;
        } else {
            s.accessToken   = authData[ 'access_token' ];
            s.expiresIn     = authData[ 'expires_in' ];
            s.tokenType     = authData[ 'token_type' ];
            s.authenticated = true;
        }

        return s;
    }

    public getPlaybackState () {
        if (!this.isAuthenticated ()) {
            console.log ('not logged in', this.userSession);
            this.beginLogin ();
            return;
        }

        let headers = new HttpHeaders ({
            'Content-Type': 'application/json',
            // @ts-ignore
            'Authorization': `Bearer ${this.userSession.accessToken}`
        });

        this._httpService.get (this._spotifyApiUrl + '/player', { headers: headers })
        .subscribe ((response: PlayerState | null) => {
            if (response) {
                // IDK where there would be a case where the player state isn't returned
                this.currentPlayerState = response;
            }

            this.currentPlayerState$.next (this.currentPlayerState);
        });
    }

    public nextSong (): void {
        if (!this.isAuthenticated ()) {
            console.log ('not logged in', this.userSession);
            this.beginLogin ();
            return;
        }

        let headers = new HttpHeaders ({
            'Content-Type': 'application/json',
            // @ts-ignore
            'Authorization': `Bearer ${this.userSession.accessToken}`
        });

        this._httpService.post (this._spotifyApiUrl + '/player/next', null, { headers: headers })
        .subscribe ();
    }

    public previousSong (): void {
        if (!this.isAuthenticated ()) {
            console.log ('not logged in', this.userSession);
            this.beginLogin ();
            return;
        }

        let headers = new HttpHeaders ({
            'Content-Type': 'application/json',
            // @ts-ignore
            'Authorization': `Bearer ${this.userSession.accessToken}`
        });

        this._httpService.post (this._spotifyApiUrl + '/player/previous', null, { headers: headers })
        .subscribe ();
    }

    public pauseSong (): void {
        if (!this.isAuthenticated ()) {
            console.log ('not logged in', this.userSession);
            this.beginLogin ();
            return;
        }

        let headers = new HttpHeaders ({
            'Content-Type': 'application/json',
            // @ts-ignore
            'Authorization': `Bearer ${this.userSession.accessToken}`
        });

        this._httpService.put (this._spotifyApiUrl + '/player/pause', null, { headers: headers })
        .subscribe ();
    }

    public startSong (): void {
        if (!this.isAuthenticated ()) {
            console.log ('not logged in', this.userSession);
            this.beginLogin ();
            return;
        }

        let headers = new HttpHeaders ({
            'Content-Type': 'application/json',
            // @ts-ignore
            'Authorization': `Bearer ${this.userSession.accessToken}`
        });

        this._httpService.put (this._spotifyApiUrl + '/player/play', null, { headers: headers })
        .subscribe ();
    }

    public isAuthenticated () {
        //TODO add expired based check
        return this.userSession && this.userSession.authenticated;
    }

}
