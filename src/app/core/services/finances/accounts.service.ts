import { Injectable }                           from '@angular/core';
import { SlothBackendService }                  from '../sloth-backend.service';
import { Account }                              from '../../types/finances/account.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap }                                  from 'rxjs/operators';
import { HeaderService }                        from '../header.service';

@Injectable ({
    providedIn: 'root'
})
export class AccountsService {

    public accounts: Account[]           = [];
    public accounts$: Subject<Account[]> = new BehaviorSubject<Account[]> ([]);

    constructor (
        private _headerService: HeaderService,
        private _slothService: SlothBackendService
    ) {
    }

    public getAllAccounts (): Observable<Account[]> {
        return this._slothService.getList<Account> ('accounts', Account, {}).pipe (
            tap ((accounts: any) => {
                    this.accounts = accounts.data;
                    this.accounts$.next (accounts.data);
                    return accounts.data;
                }
            )
        );
    }

    public getAccount (id: number): Observable<Account | null> {
        return this._slothService.getOne<Account> (`account/${id}`, Account, {});
    }

    public createAccount (account: Account): Observable<Account> {
        this._headerService.startLoadingForKey ('create-account');
        return this._slothService.post ('account', account, {});
    }

    public updateAccount (account: Account): Observable<Account> {
        this._headerService.startLoadingForKey ('update-account');
        return this._slothService.put (`account/${account.id}`, account, {});
    }

    public deleteAccount (account: Account): Observable<Account> {
        this._headerService.startLoadingForKey ('delete-account');
        return this._slothService.delete (`account/${account.id}`, {});
    }
}
