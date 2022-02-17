import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }            from './views/home/home.component';
import { StartPageComponent }       from './views/start-pages/start-page/start-page.component';
import { NotesComponent }           from './views/start-pages/notes/notes.component';
import { SpotifyCallbackComponent } from './views/callback/spotify-callback/spotify-callback.component';
import { MemexComponent }           from './views/start-pages/memex/memex.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'starts',
        children: [
            {
                path: 'start',
                component: StartPageComponent,
            },
            {
                path: 'notes',
                component: NotesComponent,
            },
            {
                path: 'memex',
                component: MemexComponent
            }
        ]
    },
    {
        path: 'callback',
        children: [
            {
                path: 'spotify',
                component: SpotifyCallbackComponent
            }
        ]
    }
];

@NgModule ({
    imports: [
        RouterModule.forRoot (routes)
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
