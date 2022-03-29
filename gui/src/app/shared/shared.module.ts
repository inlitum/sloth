import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { AccountComponent }    from './finances/account/account.component';
import { DollarPipe } from './pipes/dollar.pipe';
import { UrlifyPipe } from './pipes/urlify.pipe';
import { PrettyDatePipe } from './pipes/pretty-date.pipe';
import { ModalComponent } from './modal/modal.component';

@NgModule ({
    declarations: [
        LoadingBarComponent,
        AccountComponent,
        DollarPipe,
        UrlifyPipe,
        PrettyDatePipe,
        ModalComponent
    ],
    exports: [
        AccountComponent,
        UrlifyPipe,
        DollarPipe,
        PrettyDatePipe,
        ModalComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {
}
