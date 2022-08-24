import { Component, ContentChild, Directive, Input, OnInit, TemplateRef } from '@angular/core';

interface TableHeaderTemplateContext<TItem extends object> {
    $implicit: TItem[];
}

@Directive ({
                selector: 'ng-template[slothTableHeader]',
            })
export class TableHeaderTemplateDirective<TItem extends object> {
    @Input ('slothTableHeader') data!: TItem[] | '';

    static ngTemplateContextGuard<TContextItem extends object> (
        dir: TableHeaderTemplateDirective<TContextItem>,
        ctx: unknown,
    ): ctx is TableHeaderTemplateContext<TContextItem> {
        return true;
    }
}

interface TableRowTemplateContext<TItem extends object> {
    $implicit: TItem;
}

@Directive ({
                selector: 'ng-template[slothTableRow]',
            })
export class TableRowTemplateDirective<TItem extends object> {
    @Input ('slothTableRow') data!: TItem[];

    static ngTemplateContextGuard<TContextItem extends object> (
        dir: TableRowTemplateDirective<TContextItem>,
        ctx: unknown,
    ): ctx is TableRowTemplateContext<TContextItem> {
        return true;
    }
}

@Component ({
                selector   : 'sloth-table',
                templateUrl: './sloth-table.component.html',
                styleUrls  : [ './sloth-table.component.scss' ],
            })
export class SlothTableComponent<TItem extends object> implements OnInit {
    @Input () data!: TItem[];
    @ContentChild (TableHeaderTemplateDirective, { read: TemplateRef })
    headers?: TemplateRef<any>;
    @ContentChild (TableRowTemplateDirective, { read: TemplateRef })
    rows?: TemplateRef<any>;

    constructor () { }

    ngOnInit (): void {
    }

}
