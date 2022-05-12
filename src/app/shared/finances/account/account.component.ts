import { Component, Input, OnInit } from '@angular/core';
import { Account }                  from '../../../core/types/finances/account.model';
import { Router }                   from '@angular/router';

@Component ({
    selector: 'app-account[account]',
    templateUrl: './account.component.html',
    styleUrls: [ './account.component.scss' ]
})
export class AccountComponent implements OnInit {

    @Input ()
    account: Account | undefined;

    constructor (
        private _router: Router
    ) {
    }

    ngOnInit (): void {
    }

    addTransaction (event: MouseEvent) {
        event.stopPropagation ();
    }

    showAccount () {
        if (!this.account) {
            console.error('No account set.')
            return;
        }

        this._router.navigate([`pages/account/${this.account.id}`])
    }
}
