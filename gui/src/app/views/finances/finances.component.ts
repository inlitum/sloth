import { Component, OnInit } from '@angular/core';
import { AccountsService }   from '../../core/services/finances/accounts.service';
import { Account }           from '../../core/types/finances/account.model';

@Component ({
    selector: 'app-finances',
    templateUrl: './finances.component.html',
    styleUrls: [ './finances.component.scss' ]
})
export class FinancesComponent implements OnInit {

    accounts: Account[] = [];

    constructor (private _accountsService: AccountsService) {
        this._accountsService.accounts$
        .subscribe ((accounts) => {
            this.accounts = accounts;
        });

        this._accountsService.getAllAccounts ().subscribe ();
    }

    ngOnInit (): void {
    }

    createNewAccount () {
        console.log('finna create me a new account')
    }
}
