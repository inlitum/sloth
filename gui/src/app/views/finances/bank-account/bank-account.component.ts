import { Component, OnInit } from '@angular/core';
import { Account }           from '../../../core/types/finances/account.model';
import { ActivatedRoute }    from '@angular/router';
import { AccountsService }   from '../../../core/services/finances/accounts.service';

@Component ({
    selector: 'app-bank-account',
    templateUrl: './bank-account.component.html',
    styleUrls: [ './bank-account.component.scss' ]
})
export class BankAccountComponent implements OnInit {

    public account: Account | null = null;
    public creatingNewAccount: boolean = false;

    constructor (
        private _route: ActivatedRoute,
        private _accountService: AccountsService
        ) {
    }

    ngOnInit (): void {
        this._route.params.subscribe(params => {
            let accountId = params['id'];

            if (accountId === 'new') {
                this.creatingNewAccount = true;
                return;
            }

            this._accountService.getAccount(accountId)
                .subscribe((account) => {
                    console.log(account);
                    this.account = account;
                })
        })
    }

}
