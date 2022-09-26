import { Component }       from '@angular/core';
import { ActivatedRoute }  from '@angular/router';
import { finalize }        from 'rxjs';
import { Account }         from '../../../models/finance/account.model';
import { AccountsService } from '../../../services/data-services/accounts.service';
import { HeaderService }   from '../../../services/header.service';
import { BaseComponent }   from '../../base.component';

@Component ({
                selector   : 'app-account-details',
                templateUrl: './account-details.component.html',
                styleUrls  : [ './account-details.component.scss' ],
            })
export class AccountDetailsComponent extends BaseComponent {

    public account: Account | null = null;

    constructor (
        private _route: ActivatedRoute,
        private _header: HeaderService,
        private _accountsService: AccountsService,
    ) {
        super ();
    }

    onDestroy (): void {
    }

    onInit (): void {
        let routeSub = this._route.params.subscribe (params => {
            const id = params['id'];
            if (!id) {
                return;
            }

            this.fetchAccount (id);
        })

        this.subscriptions.add (routeSub);
    }

    private fetchAccount (accountId: number) {
        this._header.startLoadingForKey ('account');
        let accountSub = this._accountsService.getAccount (accountId)
                             .pipe (
                                 finalize (() => {
                                     this._header.stopLoadingForKey ('account');
                                 }),
                             ).subscribe (account => {
                                              this.account = account;
                                          },
            )

        this.subscriptions.add(accountSub);
    }
}
