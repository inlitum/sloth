import { Component, Input, OnInit } from '@angular/core';
import { Router }                   from '@angular/router';

export interface SidebarObject {
    name: string,
    icon?: string,
    link?: string,
    callback?: () => void,
    children?: SidebarObject[]
}

@Component ({
    selector:    'app-sidebar-object [object]',
    templateUrl: './sidebar-object.component.html',
    styleUrls:   ['./sidebar-object.component.scss'],
})
export class SidebarObjectComponent implements OnInit {

    @Input ()
    object!: SidebarObject;
    @Input ()
    child: boolean = false;
    @Input ()
    lastItem: boolean = false;

    // Operation Flags
    showChildren: boolean = false;

    constructor (
        private _router: Router
    ) { }

    ngOnInit (): void {
        if (!this.object) {
            return;
        }
    }

    toggleChildren (): void {
        this.showChildren = !this.showChildren;
    }

    handleContentClick (): void {
        if (!this.object.link && !this.object.callback) {
            return;
        }

        if (this.object.link) {
            this._router.navigate([this.object.link])
                .then(() => {
                    if (this.object.callback) {
                        this.object.callback();
                    }
                })

            return;
        }

        if (this.object.callback) {
            this.object.callback();
        }
    }

}
