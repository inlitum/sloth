import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowCanvasComponent } from './components/flow-canvas/flow-canvas.component';

@NgModule ({
    declarations: [
        FlowCanvasComponent
    ],
    exports: [
        FlowCanvasComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {
}
