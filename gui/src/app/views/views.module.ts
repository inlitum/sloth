import { NgModule } from '@angular/core';

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
import { RouterModule }             from '@angular/router';
import { ConcordsComponent }        from './simulations/concords/concords.component';
import { SettingsComponent }        from './settings/settings.component';
import { AccountComponent }         from './account/account.component';
import { KnowledgeComponent }       from './pages/knowledge/knowledge.component';

@NgModule ({
    declarations: [
        HomeComponent,
        PageNotFoundComponent,
        SpotifyCallbackComponent,
        StartPageComponent,
        NotesComponent,
        MemexComponent,
        ConcordsComponent,
        SettingsComponent,
        AccountComponent,
        KnowledgeComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule
    ]
})
export class ViewsModule {
}
