import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { AccountComponent }    from './finances/account/account.component';
import { DollarPipe } from './pipes/dollar.pipe';
import { UrlifyPipe } from './pipes/urlify.pipe';

@NgModule ({
    declarations: [
        LoadingBarComponent,
        AccountComponent,
        DollarPipe,
        UrlifyPipe
    ],
    exports: [
        AccountComponent,
        UrlifyPipe
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {
}
