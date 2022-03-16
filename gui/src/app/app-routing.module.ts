import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }        from './views/home/home.component';
import { SettingsComponent }    from './views/settings/settings.component';
import { KnowledgeComponent }   from './views/pages/knowledge/knowledge.component';
import { FinancesComponent }    from './views/finances/finances.component';
import { LoginComponent }       from './views/auth/login/login.component';
import { AuthGuard }            from './shared/guards/auth.guard';
import { ProfileComponent }     from './views/profile/profile.component';
import { BankAccountComponent } from './views/finances/bank-account/bank-account.component';

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
            },
            {
                path: 'finances',
                component: FinancesComponent,
            },
            {
                path: 'account/:id',
                component: BankAccountComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
        ],
        canActivateChild: [ AuthGuard ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
];

@NgModule ({
    imports: [
        RouterModule.forRoot (routes)
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
