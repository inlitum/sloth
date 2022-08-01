import { NgModule }                      from '@angular/core';
import { RouterModule, Routes }          from '@angular/router';
import { AuthGuard }                     from './guards/auth.guard';
import { FinanceGuard }                  from './guards/finance.guard';
import { BankAccountsComponent }         from './views/finance/bank-accounts/bank-accounts.component';
import { HomeComponent }                 from './views/home/home.component';
import { AdminDashboardComponent }       from './views/admin/admin-dashboard/admin-dashboard.component';
import { AdminUserDetailsComponent }     from './views/admin/admin-user-details/admin-user-details.component';
import { AdminUserSearchComponent }      from './views/admin/admin-user-search/admin-user-search.component';
import { AdminGroupSearchComponent }     from './views/admin/admin-group-search/admin-group-search.component';
import { AdminUserGroupSearchComponent } from './views/admin/admin-user-group-search/admin-user-group-search.component';
import { LoginComponent }                from './views/auth/login/login.component';
import { AdminGuard }                    from './guards/admin.guard';

const routes: Routes = [
  {
    path     : '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path            : '',
    children        : [
      {
        path       : 'finance',
        component  : BankAccountsComponent,
        children   : [
          {
            path     : 'accounts',
            component: BankAccountsComponent,
          },
        ],
        canActivate: [ FinanceGuard ],
      },
      {
        path     : 'admin',
        component: AdminDashboardComponent,
        children : [
          {
            path     : 'users',
            component: AdminUserSearchComponent,
          },
          {
            path     : 'user/:id',
            component: AdminUserDetailsComponent,
          },
          {
            path     : 'groups',
            component: AdminGroupSearchComponent,
          },
          {
            path     : 'user-groups',
            component: AdminUserGroupSearchComponent,
          },
        ],
        canActivate: [AdminGuard],
        canActivateChild: [AdminGuard]
      },
    ],
    canActivateChild: [ AuthGuard ],
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule( {
             imports: [
               RouterModule.forRoot( routes ),
             ],
             exports: [ RouterModule ],
           } )
export class AppRoutingModule {
}
