import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router }                              from '@angular/router';
import { Subscription }                        from 'rxjs';
import { SlothSidebarItem }                    from '../../interface/sidebar.interface';
import { SidebarService }                      from '../../services/sidebar.service';

@Component ({
                selector   : 'sloth-sidebar-item[sidebarItem]',
                templateUrl: './sloth-sidebar-item.component.html',
                styleUrls  : [ './sloth-sidebar-item.component.scss' ],
            })
export class SlothSidebarItemComponent implements OnInit, OnDestroy {

    @Input()
    sidebarItem!: SlothSidebarItem;

    @Input()
    fullSize: boolean = false;

    public active: boolean = false;

    private _subscriptions: Subscription = new Subscription();

    constructor (private _router: Router, private _sidebarService: SidebarService) { }

    ngOnInit (): void {
        // Subscribe to when the sidebar is changed.
        let sidebarSub = this._sidebarService.$sidebarItemChanged.subscribe((item: SlothSidebarItem) => {
            if (this.sidebarItem.id !== item.id) {
                return;
            }

            this.sidebarItem = item;
            if (item.active != null) {
                this.active = item.active;
            }
        });

        this._subscriptions.add(sidebarSub);
    }

    ngOnDestroy (): void {
        this._subscriptions.unsubscribe();
    }

    /**
     * Used by the section sidebar item to toggle the visibility of the children.
     */
    toggleSection () {
        this.active = !this.active;
    }

}
