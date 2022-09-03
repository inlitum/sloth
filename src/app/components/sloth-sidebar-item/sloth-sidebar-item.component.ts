import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router }                              from '@angular/router';
import { Subscription }                        from 'rxjs';
import { SidebarService }                      from '../../services/sidebar.service';

export interface SlothSidebarItem {
    id: string;
    type: 'link' | 'header' | 'text' | 'section';
    text: string;
    icon?: string;
    link?: string;
    color?: string;
    badge?: string;
    active?: boolean;
    children?: SlothSidebarItem[];
}

@Component ({
                selector   : 'sloth-sidebar-item[sidebarItem]',
                templateUrl: './sloth-sidebar-item.component.html',
                styleUrls  : [ './sloth-sidebar-item.component.scss' ],
            })
export class SlothSidebarItemComponent implements OnInit, OnDestroy {

    @Input()
    sidebarItem!: SlothSidebarItem;

    public active: boolean = false;

    private _subscriptions: Subscription = new Subscription();

    constructor (private _router: Router, private _sidebarService: SidebarService) { }

    ngOnInit (): void {
        let sidebarSub = this._sidebarService.$sidebarItemChanged.subscribe((item: SlothSidebarItem) => {
            if (this.sidebarItem.id !== item.id) {
                return;
            }

            this.sidebarItem = item;

            if (item.active != null) {
                this.active = item.active;
            }
        })

        this._subscriptions.add(sidebarSub);
    }

    ngOnDestroy (): void {
        this._subscriptions.unsubscribe();
    }

    toggleSection () {
        this.active = !this.active;
    }

}
