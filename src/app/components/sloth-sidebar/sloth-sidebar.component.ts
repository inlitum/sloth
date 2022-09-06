import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil }           from 'rxjs';
import { SlothSidebar }                 from '../../interface/sidebar.interface';
import { SidebarService }               from '../../services/sidebar.service';

@Component ({
                selector   : 'sloth-sidebar',
                templateUrl: './sloth-sidebar.component.html',
                styleUrls  : [ './sloth-sidebar.component.scss' ],
            })
export class SlothSidebarComponent implements OnInit, OnDestroy {

    private $onDestroy: Subject<boolean> = new Subject<boolean> ();

    public sidebar: SlothSidebar | null = null;

    constructor (private _sidebarService: SidebarService) {

    }

    ngOnInit (): void {
        this._sidebarService.$sidebar.pipe (takeUntil (this.$onDestroy)).subscribe (
            (sidebar: SlothSidebar | null) => {
                this.sidebar = sidebar;
            },
        )


        let sidebar: SlothSidebar = {
            type: 'small',
            children: [
                {
                    id  : 'A',
                    text: 'Dashboard',
                    type: 'link',
                    link: '/',
                }
                , {
                    id: 'B',
                    text: 'Pages',
                    type: 'header',
                    children: [
                        {
                            id      : 'BA',
                            text    : 'Finances',
                            type    : 'section',
                            children: [
                                {
                                    id   : 'BAA',
                                    text : 'Accounts',
                                    type : 'link',
                                    link : '/finance/accounts',
                                    color: '#E4D192',
                                },
                            ],
                        },
                    ]
                },
                {
                    id: 'C',
                    text: 'Admin Pages',
                    type: 'header',
                    children: [
                        {
                            id   : 'CA',
                            text : 'Users',
                            type : 'link',
                            link : '/admin/users',
                            color: '#80558C',
                        },
                        {
                            id   : 'CB',
                            text : 'Groups',
                            type : 'link',
                            link : '/admin/groups',
                            color: '#54BAB9',
                        },
                        {
                            id   : 'CC',
                            text : 'User Groups',
                            type : 'link',
                            link : '/admin/user-groups',
                            color: '#6E85B7',
                        },
                    ],
                }
            ]
    };

        this._sidebarService.setSidebarObject (sidebar);
    }

    ngOnDestroy (): void {
        this.$onDestroy.next (true);
    }

}
