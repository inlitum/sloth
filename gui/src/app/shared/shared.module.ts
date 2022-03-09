import { NgModule }     from '@angular/core';
import { CommonModule }   from '@angular/common';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';

@NgModule ({
    declarations: [
  
    LoadingBarComponent
  ],
    exports: [
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {
}
