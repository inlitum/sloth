import { NgModule }               from "@angular/core";
import { CardComponent }          from "./card/card.component";
import { ModalComponent }         from './modal/modal.component';
import { SidebarObjectComponent } from './sidebar-object/sidebar-object.component';
import { CommonModule }           from '@angular/common';

@NgModule ({
    declarations: [
        CardComponent,
        ModalComponent,
        SidebarObjectComponent,
    ],
    exports: [
        CardComponent,
        ModalComponent,
        SidebarObjectComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class ComponentsModule {
}
