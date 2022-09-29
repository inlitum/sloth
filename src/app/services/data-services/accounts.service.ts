import { Injectable }                   from '@angular/core';
import { Observable }                   from 'rxjs';
import { Account }                      from '../../models/finance/account.model';
import { DataSet, SlothBackendService } from '../sloth-backend.service';

@Injectable ({
                 providedIn: 'root',
             })
export class AccountsService {

    constructor (
        private _sloth: SlothBackendService,
    ) { }

    public getAllAccounts (): Observable<DataSet<Account>> {
        return this._sloth.getList (`accounts`, Account, {})
    }

    public getAccount (accountId: number): Observable<Account> {
        return this._sloth.getOne(`accounts/${accountId}`, Account, {});
    }

    public createAccount (account: { account_name: string, starting_amount: number }): Observable<Account> {
        return this._sloth.post (`accounts`, account, {});
    }

    public updateAccount (account: Account): Observable<Account> {
        return this._sloth.put(`accounts/${account.accountId}`, account.toHttpParams(), Account, {});
    }
}
