import { NgModule }     from '@angular/core';

import { HomeComponent }            from './home/home.component';
import { PageNotFoundComponent }    from './page-not-found/page-not-found.component';
import { FormsModule }              from '@angular/forms';
import { BrowserModule }            from '@angular/platform-browser';
import { SpotifyCallbackComponent } from './callback/spotify-callback/spotify-callback.component';
import { CommonModule }             from '@angular/common';
import { StartPageComponent }       from './start-pages/start-page/start-page.component';
import { NotesComponent }           from './start-pages/notes/notes.component';
import { SharedModule }             from '../shared/shared.module';
import { MemexComponent }           from './start-pages/memex/memex.component';

@NgModule ({
    declarations: [
        HomeComponent,
        PageNotFoundComponent,
        SpotifyCallbackComponent,
        StartPageComponent,
        NotesComponent,
        MemexComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        SharedModule
    ]
})
export class ViewsModule {
}
