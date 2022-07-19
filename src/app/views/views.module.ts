import { CommonModule }              from "@angular/common";
import { NgModule }                  from "@angular/core";
import { FormsModule }               from "@angular/forms";
import { RouterModule }              from "@angular/router";
import { FinanceModule }             from "./finance/finance.module";
import { HomeComponent }             from "./home/home.component";
import { AdminDashboardComponent }   from './admin/admin-dashboard/admin-dashboard.component';
import { UserGroupsComponent }       from './admin/user-groups/user-groups.component';
import { AdminUserDetailsComponent } from './admin/admin-user-details/admin-user-details.component';
import { ComponentsModule }          from '../components/components.module';

@NgModule ({
    declarations: [
        HomeComponent,
        AdminDashboardComponent,
        UserGroupsComponent,
        AdminUserDetailsComponent
    ],
    exports: [
        HomeComponent,
        AdminDashboardComponent,
        UserGroupsComponent,
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
