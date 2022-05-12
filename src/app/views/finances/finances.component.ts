import { Component, OnInit } from '@angular/core';
import { AccountsService }   from '../../core/services/finances/accounts.service';
import { Account }           from '../../core/types/finances/account.model';
import { Router }            from '@angular/router';

@Component ({
    selector: 'app-finances',
    templateUrl: './finances.component.html',
    styleUrls: [ './finances.component.scss' ]
})
export class FinancesComponent implements OnInit {

    accounts: Account[] = [];

    constructor (
        private _accountsService: AccountsService,
        private _router: Router
        ) {
        this._accountsService.accounts$
        .subscribe ((accounts) => {
            this.accounts = accounts;
        });

        this._accountsService.getAllAccounts ().subscribe ();
    }

    ngOnInit (): void {
    }

    createNewAccount () {
        this._router.navigate(['pages/account/new'])
    }
}
