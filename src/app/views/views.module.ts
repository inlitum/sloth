import { CommonModule }              from "@angular/common";
import { NgModule }                  from "@angular/core";
import { FormsModule }               from "@angular/forms";
import { RouterModule }              from "@angular/router";
import { FinanceModule }             from "./finance/finance.module";
import { HomeComponent }             from "./home/home.component";
import { AdminDashboardComponent }   from './admin/admin-dashboard/admin-dashboard.component';
import { AdminUserDetailsComponent } from './admin/admin-user-details/admin-user-details.component';
import { ComponentsModule }          from '../components/components.module';
import { AdminUserSearchComponent } from './admin/admin-user-search/admin-user-search.component';
import { AdminGroupSearchComponent } from './admin/admin-group-search/admin-group-search.component';
import { AdminUserGroupSearchComponent } from './admin/admin-user-group-search/admin-user-group-search.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule ({
    declarations: [
        HomeComponent,
        AdminDashboardComponent,
        AdminUserDetailsComponent,
        AdminUserSearchComponent,
        AdminGroupSearchComponent,
        AdminUserGroupSearchComponent,
        LoginComponent
    ],
    exports: [
        HomeComponent,
        AdminDashboardComponent,
        AdminUserDetailsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FinanceModule,
        ComponentsModule,
    ],
})
export class ViewsModule {
}
