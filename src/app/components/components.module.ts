import { NgModule }               from "@angular/core";
import { CardComponent }          from "./card/card.component";
import { ModalComponent }         from './modal/modal.component';
import { SidebarObjectComponent } from './sidebar-object/sidebar-object.component';
import { CommonModule }           from '@angular/common';
import { SlothSidebarComponent }  from './sloth-sidebar/sloth-sidebar.component';
import { SlothNavbarComponent }   from './sloth-navbar/sloth-navbar.component';
import { RouterModule }           from '@angular/router';

@NgModule ({
    declarations: [
        CardComponent,
        ModalComponent,
        SidebarObjectComponent,
        SlothSidebarComponent,
        SlothNavbarComponent,
    ],
               exports: [
                   CardComponent,
                   ModalComponent,
                   SidebarObjectComponent,
                   SlothSidebarComponent,
                   SlothNavbarComponent,
               ],
               imports: [
                   CommonModule,
                   RouterModule,
               ],
})
export class ComponentsModule {
}
