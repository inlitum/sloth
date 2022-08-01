import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SidebarObject }                                                                                       from '../../../components/sidebar-object/sidebar-object.component';

export interface AdminSidebar {
    content: SidebarObject[];
}

@Component ({
    selector:    'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls:   ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {

    constructor (
        private _renderer: Renderer2,
        private _changeDetector: ChangeDetectorRef
    ) {
    }

    ngOnInit (): void {
    }
}
