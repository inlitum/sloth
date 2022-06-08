import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FinanceModule } from "./finance/finance.module";
import { HomeComponent } from "./home/home.component";

@NgModule ({
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FinanceModule
    ]
})
export class ViewsModule {
}
