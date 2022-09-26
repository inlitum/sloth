import { CommonModule }            from '@angular/common';
import { NgModule }                from '@angular/core';
import { ReactiveFormsModule }     from '@angular/forms';
import { ComponentsModule }        from 'src/app/components/components.module';
import { PrettyCurrencyPipe }      from 'src/app/pipes/pretty-currency.pipe';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountsSearchComponent } from './accounts-search/accounts-search-component';

@NgModule ( {
    declarations: [
        AccountsSearchComponent,
        AccountDetailsComponent
    ],
    exports:      [
        AccountsSearchComponent,
        AccountDetailsComponent
    ],
    providers:    [
        PrettyCurrencyPipe
    ],
    imports:      [
        CommonModule,
        ComponentsModule,
        ReactiveFormsModule,
    ],
} )
export class FinanceModule {
}
