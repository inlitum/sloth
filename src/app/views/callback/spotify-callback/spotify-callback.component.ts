import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService }         from '../../../core/services/spotify/spotify.service';
import { LocalStorageService }    from '../../../core/services/local-storage.service';

@Component ({
    selector: 'app-spotify-callback',
    templateUrl: './spotify-callback.component.html',
    styleUrls: [ './spotify-callback.component.scss' ]
})
export class SpotifyCallbackComponent implements OnInit {

    constructor (private route: ActivatedRoute, private _router: Router, private _spotifyService: SpotifyService, private _localStorageService: LocalStorageService) {
        this.route.queryParams.subscribe (params => {
            this._spotifyService.completeOAuthLogin (params.code).subscribe (() => {
                    let url = this._localStorageService.get ('return-url');

                    this._router.navigate ([ url ? url : '' ]);
                }
            );
        });
    }

    ngOnInit (): void {
    }

}
