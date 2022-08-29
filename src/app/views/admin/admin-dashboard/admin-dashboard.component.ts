import { ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router }                                      from '@angular/router';
import { filter, Subscription }                                       from 'rxjs';
import { SidebarObject }                                              from '../../../components/sidebar-object/sidebar-object.component';

export interface AdminSidebar {
    content: SidebarObject[];
}

@Component ({
                selector   : 'app-admin-dashboard',
                templateUrl: './admin-dashboard.component.html',
                styleUrls  : [ './admin-dashboard.component.scss' ],
            })
export class AdminDashboardComponent implements OnInit, OnDestroy {

    currentPage: string = 'admin';

    private _routerSubscription: Subscription = new Subscription ();

    constructor (
        private _renderer: Renderer2,
        private _changeDetector: ChangeDetectorRef,
        private _router: Router,
    ) {
        this._routerSubscription = this._router.events.pipe (filter (event => event instanceof NavigationEnd))
                                       .subscribe (event => {
                                           if (event instanceof NavigationEnd) {
                                               switch (event.url) {
                                                   case '/admin':
                                                       this.currentPage = 'admin';
                                                       break;
                                                   case '/admin/users':
                                                       this.currentPage = 'users';
                                                       break;
                                                   case '/admin/groups':
                                                       this.currentPage = 'groups';
                                                       break;
                                                   case '/admin/user-groups':
                                                       this.currentPage = 'user-groups';
                                                       break;
                                                   default:
                                                       console.log (event.url)
                                               }
                                           }
                                       });
    }

    ngOnInit (): void {
    }

    ngOnDestroy () {
        this._routerSubscription.unsubscribe ();
    }
}
