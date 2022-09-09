import { Injectable, OnDestroy, OnInit }          from '@angular/core';
import { NavigationEnd, Router }                  from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { SlothSidebar, SlothSidebarItem }         from '../interface/sidebar.interface';
import { AuthService }                            from './auth.service';

@Injectable ({
                 providedIn: 'root',
             })
export class SidebarService implements OnDestroy, OnInit {
    // This subject is the main subject used to update the sidebar,
    public $sidebar: BehaviorSubject<SlothSidebar | null> = new BehaviorSubject<SlothSidebar | null> (null);
    // The subject used by individual sidebar item components to check if that item was changed.
    public $sidebarItemChanged: Subject<SlothSidebarItem> = new Subject<SlothSidebarItem> ();
    // The internal reference of the sidebar.
    private _sidebarObject: SlothSidebar | null = null;
    // The link sidebar item type that matches the current route.
    // This is cached so the active flag can be removed when a route changes.
    private _currentActiveLink: SlothSidebarItem | null = null;
    // Used to unsubscribe all subscriptions in the service.
    private _subscriptions: Subscription = new Subscription ();

    constructor (private _router: Router, private _auth: AuthService) {

    }

    ngOnInit () {
        // Subscribe when a router event occurs.
        let routerSub = this._router.events.subscribe (event => {
            if (event instanceof NavigationEnd) {
                // If the event is a navigation end event, check if the route matches a sidebar item.
                let item = this.getItemByRoute (event.url);
                // If there is no item, then don't update anything.
                if (!item) {
                    return;
                }
                // If there is an active link, set the previously active link to inactive.
                if (this._currentActiveLink) {
                    this._currentActiveLink.active = false;
                    this.$sidebarItemChanged.next(this._currentActiveLink);
                }
                // Set the found item as active and ping the item to update.
                item.active = true;
                this._currentActiveLink = item;
                this.$sidebarItemChanged.next (item);
            }
        })

        this._subscriptions.add (routerSub);
    }

    ngOnDestroy (): void {
        this._subscriptions.unsubscribe ();
    }

    /**
     * Changes the structure of the sidebar.
     * @param sidebarObject The setup of the sidebar.
     */
    public setSidebarObject (sidebarObject: SlothSidebar | null) {
        this._sidebarObject = sidebarObject;
        this.$sidebar.next (this._sidebarObject);
    }

    /**
     * Recursively gets the sidebar item with the given item id
     * @param itemId The id of the item to be found
     * @param startPoint The point at which to start the search.
     */
    public getItemById (itemId: number, startPoint: SlothSidebarItem | null = null): SlothSidebarItem | null {
        //TODO optimise the fetching of the item ids.

        let outputItem: SlothSidebarItem | null = null;
        // If the sidebar object hasn't been populated, no point in searching it.
        if (this._sidebarObject == null) {
            return null;
        }

        // If the start point is null, then we loop over the entire sidebar array.
        if (startPoint == null) {
            for (let i = 0; i < this._sidebarObject.children.length; i++) {
                outputItem = this.getItemById (itemId, this._sidebarObject.children[i]);
                // If there is a match, then break out of the loop. We don't want to have to search the entire tree,
                // every time.
                if (outputItem !== null) {
                    return outputItem;
                }
            }
            // Return here, either it was found or there is no item with the id.
            return outputItem;
        }
        // Check if the current item is a match.
        if (startPoint.id === itemId) {
            // If it is, return it.
            return startPoint;
        }
        // If not, check its children.
        if (startPoint.children && startPoint.children.length > 0) {
            for (let i = 0; i < startPoint.children.length; i++) {
                outputItem = this.getItemById (itemId, startPoint.children[i]);

                if (outputItem !== null) {
                    return outputItem;
                }
            }
        }

        return outputItem;
    }

    /**
     * Recursively attempt to find the sidebar item that matches the given route.
     * @param route
     * @param startPoint
     */
    public getItemByRoute (route: string, startPoint: SlothSidebarItem | null = null): SlothSidebarItem | null {
        //TODO optimise the fetching of the items.

        // Define the output item
        let outputItem: SlothSidebarItem | null = null;
        if (this._sidebarObject == null) {
            return null;
        }
        // If there is no route then just return, this should be impossible.
        if (route === null) {
            return null;
        }
        // If no startpoint is defined, loop over the top level of the sidebar objects.
        if (startPoint == null) {
            for (let i = 0; i < this._sidebarObject.children.length; i++) {
                outputItem = this.getItemByRoute (route, this._sidebarObject.children[i]);
                // If there is a match, then break out of the loop. We don't want to have to search the entire tree,
                // every time.
                if (outputItem !== null) {
                    break;
                }
            }
            // Return here, either it was found or there is no item with the id.
            return outputItem;
        }
        // If there are any children,
        if (startPoint.children && startPoint.children.length > 0) {
            for (let i = 0; i < startPoint.children.length; i++) {
                outputItem = this.getItemByRoute (route, startPoint.children[i]);

                if (outputItem != null) {
                    return outputItem;
                }
            }
        }
        // If the current sidebar item is the link type, and the route matches the link then return the current item.
        if (startPoint.link !== null && startPoint.link == route) {
            return startPoint;
        }
        return outputItem;
    }

    /**
     * Will set the badge of the sidebar item matching the given item id.
     * @param itemId The item ID of the matching item.
     * @param badge The badge.
     */
    public setSidebarItemBadge (itemId: number, badge: string) {
        const sidebarItem = this.getItemById (itemId);

        if (!sidebarItem) {
            return;
        }

        sidebarItem.badge = badge;

        this.$sidebarItemChanged.next (sidebarItem);
    }

    public setVisibility (visibility: 'small' | 'full-size' | 'hidden') {
        if (!this._sidebarObject) {
            return;
        }
        this._sidebarObject.type = visibility;
    }
}
