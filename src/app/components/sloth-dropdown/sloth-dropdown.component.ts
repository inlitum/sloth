import {Component, ContentChild, OnInit, TemplateRef} from '@angular/core';
import {TableHeaderTemplateDirective} from "../sloth-table/sloth-table.component";

@Component({
    selector: 'sloth-dropdown',
    templateUrl: './sloth-dropdown.component.html',
    styleUrls: ['./sloth-dropdown.component.scss']
})
export class SlothDropdownComponent implements OnInit {

    @ContentChild (TableHeaderTemplateDirective, { read: TemplateRef })
    dropdownMenu?: TemplateRef<any>;

    private _dropped: boolean = false;

    get dropped (): boolean {
        return this._dropped;
    }

    set dropped (value: boolean) {
        this._dropped = value;
    }

    constructor() {
    }

    ngOnInit(): void {
    }

}
