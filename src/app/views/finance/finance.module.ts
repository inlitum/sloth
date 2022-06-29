import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentsModule } from "src/app/components/components.module";
import { PrettyCurrencyPipe } from "src/app/pipes/pretty-currency.pipe";
import { BankAccountsComponent } from "./bank-accounts/bank-accounts.component";

@NgModule ({
    declarations: [
        BankAccountsComponent
    ],
    exports: [
        BankAccountsComponent
    ],
    providers: [
        PrettyCurrencyPipe
    ],
    imports: [
        CommonModule,
        ComponentsModule
    ]
})
export class FinanceModule {
}
