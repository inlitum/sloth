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
export class AdminDashboardComponent implements OnInit, AfterViewInit {

    @ViewChild('adminSidebarWrapper')
    adminSidebarWrapper!: ElementRef;

    @ViewChild('adminDashboardContent')
    adminDashboardContent!: ElementRef;

    adminSidebarStructure: AdminSidebar | null = null;

    constructor (
        private _renderer: Renderer2,
        private _changeDetector: ChangeDetectorRef
    ) {
        this.adminSidebarStructure = {
            content: [
            ]
        }
    }

    ngOnInit (): void {

    }

    setHeightForWrapper (): void {
        this.adminSidebarStructure = {
            content: []
        };

        if (!this.adminDashboardContent || !this.adminSidebarWrapper) {
            return;
        }

        let height = this.adminDashboardContent.nativeElement.clientHeight;

        this._renderer.setAttribute(this.adminSidebarWrapper.nativeElement, 'style', `height: ${height}px; display: grid; grid-template-rows: 50px auto; overflow-y: auto;`)
    }

    ngAfterViewInit (): void {
        this.setHeightForWrapper();
        this.addTempData();
    }

    @HostListener('window:resize')
    handleResize () {
        this.setHeightForWrapper();
    }

    addTempData() {
        let users:SidebarObject = {
            name: 'users',
            icon: 'fa-users',
            children: []
        }

        let tests: SidebarObject = {
            name: 'tests',
            icon: 'fa-user',
            children: [
                {
                    name: 'add user',
                    icon: 'fa-user',
                    callback: () => {
                        if (users.children == null) {
                            users.children = [];
                        }

                        let user: SidebarObject = {
                            name: `Test User ${users.children.length + 1}`,
                            icon: 'fa-user',
                            link: `admin/user/${users.children.length}`
                        }

                        users.children.push(user);
                    }
                },
                {
                    name: 'delete user',
                    icon: 'fa-user',
                    callback: () => {
                        if (!users.children || users.children.length <= 0) {
                            return;
                        }

                        users.children.pop()
                    }
                },
                {
                    name: 'add parent',
                    icon: 'fa-user',
                    callback: () => {
                        if (users.children == null) {
                            users.children = [];
                        }

                        let child: SidebarObject = {
                            name: 'Child',
                            icon: 'fa-user'
                        }

                        let parentTest: SidebarObject = {
                            name: `Parent Test`,
                            icon: 'fa-user',
                            children: []
                        }

                        parentTest.children?.push(child);
                        parentTest.children?.push(child);
                        parentTest.children?.push(child);
                        parentTest.children?.push(child);

                        users.children.push(parentTest);
                    }
                },
                {
                    name: 'add test callback',
                    icon: 'fa-user',
                    callback: () => {
                        if (users.children == null) {
                            users.children = [];
                        }

                        let user: SidebarObject = {
                            name: `Test Callback ${users.children.length + 1}`,
                            icon: 'fa-user',
                            callback: () => {
                                console.log(user);
                            }
                        }

                        users.children.push(user);
                    }
                }
            ]
        }

        this.adminSidebarStructure?.content.push(users);
        this.adminSidebarStructure?.content.push(tests);

        this._changeDetector.detectChanges();
    }
}
