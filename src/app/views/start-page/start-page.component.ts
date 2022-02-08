import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HeaderService }                                       from '../../core/services/header.service';
import { SpotifyService }                                      from '../../core/services/spotify/spotify.service';

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

    timerId: number = 0;

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
                    link: 'https://inlitum.github.io/#/start'
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
                    link: 'https://inlitum.github.io'
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

    constructor (private _headerService: HeaderService, private _spotifyService: SpotifyService) {
        this._headerService.setPageName ('spooky start');
        let time  = new Date (Date.now ());
        this.time = time.toLocaleString ('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        this.date = time.toLocaleDateString ('en-US', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' });
    }

    ngOnInit (): void {
        this.timerId = window.setInterval (() => {
            let time = new Date (Date.now ());

            this.time = time.toLocaleString ('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
            this.date = time.toLocaleDateString ('en-US', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' });
        }, 1000);

        this._spotifyService.getPlaybackState ();
    }

    ngOnDestroy (): void {
        window.clearInterval (this.timerId);
    }

    onEnter () {
        let term             = this.searchBar?.nativeElement.value.replace (' ', '+');
        window.location.href = 'https://www.google.com/search?q=' + term;
    }
}
