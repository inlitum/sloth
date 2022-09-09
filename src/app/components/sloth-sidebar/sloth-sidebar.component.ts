import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil }           from 'rxjs';
import { SlothSidebar }                 from '../../interface/sidebar.interface';
import { AuthService }                  from '../../services/auth.service';
import { SidebarService }               from '../../services/sidebar.service';

@Component ({
                selector   : 'sloth-sidebar',
                templateUrl: './sloth-sidebar.component.html',
                styleUrls  : [ './sloth-sidebar.component.scss' ],
            })
export class SlothSidebarComponent implements OnInit, OnDestroy {

    private $onDestroy: Subject<boolean> = new Subject<boolean> ();

    public sidebar: SlothSidebar | null = null;

    constructor (private _sidebarService: SidebarService, private _auth: AuthService) {

    }

    ngOnInit (): void {
        this._sidebarService.$sidebar.pipe (takeUntil (this.$onDestroy)).subscribe (
            (sidebar: SlothSidebar | null) => {
                this.sidebar = sidebar;
            },
        )

        this._auth.status$.pipe(takeUntil(this.$onDestroy)).subscribe(
            (status) => {
                let sidebar = this.sidebar;

                if (!sidebar) {
                    sidebar = {
                        title: 'SLOTH',
                        type: 'full-size',
                        children: []
                    }
                }

                if (status && status.sidebarItems) {
                    sidebar.children = status.sidebarItems;
                }

                this._sidebarService.setSidebarObject(sidebar);
            }
        )
    }

    ngOnDestroy (): void {
        this.$onDestroy.next (true);
        this.$onDestroy.complete();
    }

}
