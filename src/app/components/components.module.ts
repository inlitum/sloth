import { CommonModule }                                                                 from '@angular/common';
import { NgModule }                                                                     from '@angular/core';
import { FormsModule }                                                                  from '@angular/forms';
import { RouterModule }                                                                 from '@angular/router';
import { CardComponent }                                                                from './card/card.component';
import { EditableLabelComponent }                                                       from './editable-label/editable-label.component';
import { ModalComponent }                                                               from './modal/modal.component';
import { SidebarObjectComponent }                                                       from './sidebar-object/sidebar-object.component';
import { SlothDropdownComponent }                                                       from './sloth-dropdown/sloth-dropdown.component';
import { SlothNavbarComponent }                                                         from './sloth-navbar/sloth-navbar.component';
import { SlothSidebarItemComponent }                                                    from './sloth-sidebar-item/sloth-sidebar-item.component';
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
                   SlothSidebarItemComponent,
                   SlothDropdownComponent,
                   EditableLabelComponent,
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
                   EditableLabelComponent,
               ],
               imports: [
                   CommonModule,
                   RouterModule,
                   FormsModule,
               ],
           })
export class ComponentsModule {
}
