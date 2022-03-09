import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }            from './views/home/home.component';
import { StartPageComponent }       from './views/start-pages/start-page/start-page.component';
import { NotesComponent }           from './views/start-pages/notes/notes.component';
import { SpotifyCallbackComponent } from './views/callback/spotify-callback/spotify-callback.component';
import { MemexComponent }           from './views/start-pages/memex/memex.component';
import { ConcordsComponent }        from './views/simulations/concords/concords.component';
import { SettingsComponent }        from './views/settings/settings.component';
import { AccountComponent }         from './views/account/account.component';
import { KnowledgeComponent }       from './views/pages/knowledge/knowledge.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'pages',
        children: [
            {
                path: 'knowledge',
                component: KnowledgeComponent
            }
        ]
    },
    {
        path: 'account',
        component: AccountComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
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
    },
    {
        path: 'sims',
        children: [
            {
                path: 'concords',
                component: ConcordsComponent
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
