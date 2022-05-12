import { Component, OnInit }   from '@angular/core';
import { Account }             from '../../../core/types/finances/account.model';
import { ActivatedRoute }      from '@angular/router';
import { AccountsService }     from '../../../core/services/finances/accounts.service';
import { TransactionsService } from '../../../core/services/finances/transactions.service';
import { Transaction }         from '../../../core/types/finances/transaction.model';

@Component ({
    selector: 'app-bank-account',
    templateUrl: './bank-account.component.html',
    styleUrls: [ './bank-account.component.scss' ]
})
export class BankAccountComponent implements OnInit {

    public account: Account | null = null;
    public creatingNewAccount: boolean = false;

    public transactions: Transaction[] = [];

    constructor (
        private _route: ActivatedRoute,
        private _accountService: AccountsService,
        private _transactionsService: TransactionsService
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
                    this.account = account;

                    if (account) {
                        this._transactionsService.getAllTransactionsForAccount (account.id)
                            .subscribe((transactions: any) => {
                                this.transactions = transactions.data;
                            })
                    } else {
                        this.transactions = [];
                    }
            })
        })
    }

}
