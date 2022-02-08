import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent }            from './home/home.component';
import { PageNotFoundComponent }    from './page-not-found/page-not-found.component';
import { FormsModule }              from '@angular/forms';
import { BrowserModule }            from '@angular/platform-browser';
import { SpotifyCallbackComponent } from './callback/spotify-callback/spotify-callback.component';

@NgModule ({
    declarations: [
        HomeComponent,
        PageNotFoundComponent,
        SpotifyCallbackComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule
    ]
})
export class ViewsModule {
}
