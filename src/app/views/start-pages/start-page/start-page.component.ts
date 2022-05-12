import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HeaderService }                                       from '../../../core/services/header.service';
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

    // Current system time
    time: string = '';
    // Current system date
    date: string = '';
    // Interval ids, stored so we can stop the interval when the page is destroyed
    timeUpdateIntervalId: number    = 0;
    spotifyUpdateIntervalId: number = 0;
    // How often spotify should be checked. This will change based on if there is a song playing
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
                },
                {
                    prefix: 'bdy',
                    text: 'palms medical',
                    link: 'https://central.indici.nz/Account/Login'
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
                },
                {
                    prefix: 'hlp',
                    text: 'regex tester',
                    link: 'https://regexr.com/'
                }
            ]
        }
    ];
    // The current spotify player state.
    currentPlayerState: PlayerState | undefined;
    // The subscription for spotify session, stored, so we can destroy this later.
    playerStateSubscription: Subscription | undefined;

    constructor (private _headerService: HeaderService) {
        // Set the title
        this._headerService.setPageName ('spooky start');
        // Get the current time, this is the setup date/time.
        let time  = new Date (Date.now ());
        this.time = time.toLocaleString ('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        this.date = time.toLocaleDateString ('en-US', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' });

        // this._spotifyService.getPlaybackState();
    }

    ngOnInit (): void {
        // Time interval, updates the time and date every second.
        this.timeUpdateIntervalId = window.setInterval (() => {
            let time = new Date (Date.now ());

            this.time = time.toLocaleString ('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
            this.date = time.toLocaleDateString ('en-US', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' });

        }, 1000);


    }

    ngOnDestroy (): void {
        window.clearInterval (this.timeUpdateIntervalId);
        window.clearInterval (this.spotifyUpdateIntervalId);

        this.playerStateSubscription?.unsubscribe ();
    }

    /**
     * Handle enter press in the text box.
     */
    onEnter () {
        // Get the search term.
        let term             = this.searchBar?.nativeElement.value.replace (' ', '+');
        // Set the current url to the google search term.
        window.location.href = 'https://www.google.com/search?q=' + term;
    }

    /**
     * Converts Milliseconds to a mm:ss string
     * @param ms
     */
    convertMsToMinutesAndSeconds (ms: number): string {
        let minutes         = Math.floor (ms / 60000);
        let seconds: number = (ms % 60000) / 1000;

        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds.toFixed (0);
    }
}
