import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { SpotifyComponent } from './services/spotify/spotify.component';

@NgModule ({
    declarations: [
        SpotifyComponent
    ],
    imports: [
        CommonModule
    ]
})
export class CoreModule {
}
