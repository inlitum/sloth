import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ComponentsModule } from "src/app/components/components.module";
import { BankAccountsComponent } from "./bank-accounts/bank-accounts.component";

@NgModule ({
    declarations: [
        BankAccountsComponent
    ],
    exports: [
        BankAccountsComponent
    ],
    imports: [
        ComponentsModule
    ]
})
export class FinanceModule {
}
