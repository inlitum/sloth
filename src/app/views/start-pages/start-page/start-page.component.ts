import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HeaderService }                                       from '../../../core/services/header.service';
import { SpotifyService }                                      from '../../../core/services/spotify/spotify.service';
import { PlayerState }                                         from '../../../core/types/spotify.types';
import { Subscription }                                        from 'rxjs';

interface link {
    prefix: string,
    link: string,
    text: string
}

interface category {
    title: string,
    side: 'left' | 'right',
    items: link[]
}

@Component ({
    selector: 'app-start-page',
    templateUrl: './start-page.component.html',
    styleUrls: [ './start-page.component.scss' ]
})
export class StartPageComponent implements OnInit, OnDestroy {

    @ViewChild ('searchBar')
    searchBar: ElementRef | undefined;

    time: string = '';

    date: string = '';

    timeUpdateIntervalId: number    = 0;
    spotifyUpdateIntervalId: number = 0;

    spotifyIntervalPeriod: 'quick' | 'long' = 'long';

    spotifyLoggedIn: boolean = false;

    categories: category[] = [
        {
            title: 'social',
            side: 'left',
            items: [
                {
                    prefix: 'frm',
                    text: 'reddit',
                    link: 'https://www.reddit.com'
                },
                {
                    prefix: 'gme',
                    text: 'discord',
                    link: 'https://discord.com/app'
                },
                {
                    prefix: 'sns',
                    text: 'messenger',
                    link: 'https://www.messenger.com'
                },
                {
                    prefix: 'sns',
                    text: 'instagram',
                    link: 'https://www.instagram.com'
                },
                {
                    prefix: 'eml',
                    text: 'hotmail',
                    link: 'https://outlook.live.com/owa/'
                },
                {
                    prefix: 'eml',
                    text: 'gmail',
                    link: 'https://mail.google.com/mail/u/0/?tab=wm#inbox'
                }
            ]
        },
        {
            title: 'work',
            side: 'left',
            items: [
                {
                    prefix: 'crd',
                    text: 'board',
                    link: 'https://youtrack.nsquared.nz/agiles/114-38/current'
                },
                {
                    prefix: 'bgs',
                    text: 'youtrack',
                    link: 'https://youtrack.nsquared.nz'
                },
                {
                    prefix: 'hub',
                    text: 'dashboard',
                    link: 'https://hub.nsquared.nz/hub/dashboard'
                },
                {
                    prefix: 'flw',
                    text: 'n2fe',
                    link: 'http://localhost/n2fe'
                },
                {
                    prefix: 'dev',
                    text: 'n2acd',
                    link: 'http://localhost:5005'
                },
                {
                    prefix: 'dev',
                    text: 'environment',
                    link: 'http://localhost:4200'
                }
            ]
        },
        {
            title: 'starts',
            side: 'left',
            items: [
                {
                    prefix: 'spk',
                    text: 'spooky start',
                    link: 'https://inlitum.github.io/sloth/starts/start'
                }
            ]
        },
        {
            title: 'mine',
            side: 'right',
            items: [
                {
                    prefix: 'web',
                    text: 'sloth',
                    link: 'https://inlitum.github.io/sloth/'
                }
            ]
        },
        {
            title: 'media',
            side: 'right',
            items: [
                {
                    prefix: 'vid',
                    text: 'netflix',
                    link: 'https://www.netflix.com/browse'
                },
                {
                    prefix: 'vid',
                    text: 'neon',
                    link: 'https://www.neontv.co.nz/'
                },
                {
                    prefix: 'vid',
                    text: 'disney',
                    link: 'https://www.disneyplus.com/en-nz'
                },
                {
                    prefix: 'mus',
                    text: 'spotify',
                    link: 'https://open.spotify.com/'
                },
                {
                    prefix: 'mus',
                    text: 'youtube',
                    link: 'https://www.youtube.com/'
                }
            ]
        },
        {
            title: 'repos',
            side: 'right',
            items: [
                {
                    prefix: 'git',
                    text: 'sloth',
                    link: 'https://github.com/inlitum/sloth'
                }
            ]
        },
        {
            title: 'other',
            side: 'right',
            items: [
                {
                    prefix: 'sup',
                    text: 'secret',
                    link: 'https://i.kym-cdn.com/entries/icons/original/000/007/762/337.gif'
                }
            ]
        }
    ];

    currentPlayerState: PlayerState | undefined;

    playerStateSubscription: Subscription | undefined;

    constructor (private _headerService: HeaderService, private _spotifyService: SpotifyService) {
        this._headerService.setPageName ('spooky start');
        let time  = new Date (Date.now ());
        this.time = time.toLocaleString ('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        this.date = time.toLocaleDateString ('en-US', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' });

        this._spotifyService.userSession$.subscribe ((session) => {
            this.spotifyLoggedIn = !!session;

            if (session && session.authenticated) {
                this.setupSpotifyCheck ();
            }
        });
        if (_spotifyService.userSession?.authenticated) {
            this._spotifyService.getPlaybackState ();
        }
        // this._spotifyService.getPlaybackState();
    }

    ngOnInit (): void {
        this.timeUpdateIntervalId = window.setInterval (() => {
            let time = new Date (Date.now ());

            this.time = time.toLocaleString ('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
            this.date = time.toLocaleDateString ('en-US', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' });

        }, 1000);

        this.playerStateSubscription = this._spotifyService.currentPlayerState$.subscribe (state => {
            if (state == null) {
                return;
            }

            this.currentPlayerState = state;

            let updatePeriod = false;

            if (state.is_playing) {
                if (this.spotifyIntervalPeriod === 'long') {
                    updatePeriod               = true;
                    this.spotifyIntervalPeriod = 'quick';
                }
            } else if (this.spotifyIntervalPeriod === 'quick') {
                updatePeriod               = true;
                this.spotifyIntervalPeriod = 'long';
            }

            if (updatePeriod) {
                window.clearInterval (this.spotifyUpdateIntervalId);

                this.setupSpotifyCheck ();
            }
        });

    }

    ngOnDestroy (): void {
        window.clearInterval (this.timeUpdateIntervalId);
        window.clearInterval (this.spotifyUpdateIntervalId);

        this.playerStateSubscription?.unsubscribe ();
    }

    onEnter () {
        let term             = this.searchBar?.nativeElement.value.replace (' ', '+');
        window.location.href = 'https://www.google.com/search?q=' + term;
    }

    loginToSpotify () {
        if (this.spotifyLoggedIn) {
            return;
        }

        this._spotifyService.beginLogin ();
    }

    setupSpotifyCheck () {
        this.spotifyUpdateIntervalId = window.setInterval (() => {
            this._spotifyService.getPlaybackState ();
        }, this.spotifyIntervalPeriod === 'quick' ? 1000 : 5000);

    }

    convertMsToMinutesAndSeconds (ms: number) {
        let minutes         = Math.floor (ms / 60000);
        let seconds: number = (ms % 60000) / 1000;

        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds.toFixed (0);
    }

    performAction (action: 'previous' | 'pause' | 'resume' | 'next') {
        console.log (action);
        switch (action) {
            case 'previous':
                this._spotifyService.previousSong ();
                break;
            case 'pause':
                this._spotifyService.pauseSong ();
                break;
            case 'resume':
                this._spotifyService.startSong ();
                break;
            case 'next':
                this._spotifyService.nextSong ();
                break;
        }
    }
}
