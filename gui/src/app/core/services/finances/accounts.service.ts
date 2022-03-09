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
        private _slothService: SlothBackendService
    ) {
    }

    public getAllAccounts (): Observable<Account[]> {
        return this._slothService.get ('accounts', {}).pipe (
            tap ((accounts) => {
                    this.accounts = accounts;
                    this.accounts$.next (accounts);
                }
            )
        );
    }

    public getAccount (id: number): Observable<Account | null> {
        return this._slothService.get (`accounts/${id}`, {});
    }

    public createAccount (account: Account): Observable<Account> {
        return this._slothService.post ('accounts', account, {});
    }

    public updateAccount (account: Account): Observable<Account> {
        return this._slothService.put (`accounts/${account.id}`, account, {});
    }

    public deleteAccount (account: Account): Observable<Account> {
        return this._slothService.delete (`accounts/${account.id}`, {});
    }
}
