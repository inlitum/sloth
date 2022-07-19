import { NgModule }                  from '@angular/core';
import { RouterModule, Routes }      from '@angular/router';
import { AuthGuard }                 from './guards/auth.guard';
import { FinanceGuard }              from './guards/finance.guard';
import { BankAccountsComponent }     from './views/finance/bank-accounts/bank-accounts.component';
import { HomeComponent }             from './views/home/home.component';
import { AdminDashboardComponent }   from './views/admin/admin-dashboard/admin-dashboard.component';
import { UserGroupsComponent }       from './views/admin/user-groups/user-groups.component';
import { AdminUserDetailsComponent } from './views/admin/admin-user-details/admin-user-details.component';

const routes: Routes = [
    {
        path:      '',
        pathMatch: 'full',
        component: HomeComponent,
    },
    {
        path:             '',
        children:         [
            {
                path:        'finance',
                component:   BankAccountsComponent,
                children:    [
                    {
                        path:      'accounts',
                        component: BankAccountsComponent,
                    },
                ],
                canActivate: [FinanceGuard],
            },
            {
                path:      'admin',
                component: AdminDashboardComponent,
                children:  [
                    {
                        path: 'user/:id',
                        component: AdminUserDetailsComponent
                    },
                    {
                        path: 'groups',
                        component: UserGroupsComponent
                    }
                ],
            },
        ],
        canActivateChild: [AuthGuard],
    },
];

@NgModule ({
    imports: [
        RouterModule.forRoot (routes),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
