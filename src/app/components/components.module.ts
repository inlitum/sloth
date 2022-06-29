import { NgModule } from "@angular/core";
import { CardComponent } from "./card/card.component";
import { ModalComponent } from './modal/modal.component';

@NgModule ({
    declarations: [
        CardComponent,
        ModalComponent,
    ],
    exports: [
        CardComponent,
        ModalComponent,
    ],
    imports: [
    ]
})
export class ComponentsModule {
}