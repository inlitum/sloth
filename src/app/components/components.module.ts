import { CommonModule }                                                                 from '@angular/common';
import { NgModule }                                                                     from '@angular/core';
import { RouterModule }                                                                 from '@angular/router';
import { CardComponent }                                                                from './card/card.component';
import { ModalComponent }                                                               from './modal/modal.component';
import { SidebarObjectComponent }                                                       from './sidebar-object/sidebar-object.component';
import { SlothNavbarComponent }                                                         from './sloth-navbar/sloth-navbar.component';
import { SlothSidebarComponent }                                                        from './sloth-sidebar/sloth-sidebar.component';
import { SlothTableComponent, TableHeaderTemplateDirective, TableRowTemplateDirective } from './sloth-table/sloth-table.component';

@NgModule ({
               declarations: [
                   CardComponent,
                   ModalComponent,
                   SidebarObjectComponent,
                   SlothSidebarComponent,
                   SlothNavbarComponent,
                   SlothTableComponent,
                   TableHeaderTemplateDirective,
                   TableRowTemplateDirective,
               ],
               exports: [
                   CardComponent,
                   ModalComponent,
                   SidebarObjectComponent,
                   SlothSidebarComponent,
                   SlothNavbarComponent,
                   TableHeaderTemplateDirective,
                   TableRowTemplateDirective,
                   SlothTableComponent,
               ],
               imports     : [
                   CommonModule,
                   RouterModule,
               ],
           })
export class ComponentsModule {
}
