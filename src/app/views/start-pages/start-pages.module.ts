import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { StartPageComponent } from '../start-page/start-page.component';
import { NotesComponent }     from './notes/notes.component';

@NgModule ({
    declarations: [
        StartPageComponent,
        NotesComponent
    ],
    imports: [
        CommonModule
    ]
})
export class StartPagesModule {
}
