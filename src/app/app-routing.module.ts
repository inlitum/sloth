import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { FinanceGuard } from './guards/finance.guard';
import { BankAccountsComponent } from './views/finance/bank-accounts/bank-accounts.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      component: HomeComponent
  },
  {
    path: '',
    children: [
      {
        path: 'finance',
        component: BankAccountsComponent,
        children: [
          {
            path: 'accounts',
            component: BankAccountsComponent
          }
        ],
        canActivate: [ FinanceGuard ]
      }
    ],
    canActivateChild: [ AuthGuard ]
  },
  // {
  //     path: 'login',
  //     component: LoginComponent
  // },
  
  
  // {
  //     path: 'pages',
  //     children: [
  //         {
  //             path: 'knowledge',
  //             component: KnowledgeComponent
  //         },
  //         {
  //             path: 'finances',
  //             component: FinancesComponent,
  //         },
  //         {
  //             path: 'account/:id',
  //             component: BankAccountComponent
  //         },
  //         {
  //             path: 'profile',
  //             component: ProfileComponent
  //         },
  //         {
  //             path: 'settings',
  //             component: SettingsComponent
  //         },
  //     ],
  //     canActivateChild: [ AuthGuard ]
  // },
];

@NgModule ({
  imports: [
      RouterModule.forRoot (routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
