import { Injectable }                   from "@angular/core";
import { DataSet, SlothBackendService } from "../sloth-backend.service";
import { Observable }                   from "rxjs";
import { Transaction }                  from "../../models/finance/transaction.model";

@Injectable ( {
    providedIn: 'root',
} )
export class TransactionsService {

    constructor (
        private _sloth: SlothBackendService,
    ) {
    }

    public getAllTransactions (): Observable<DataSet<Transaction>> {
        return this._sloth.getList (`transactions`, Transaction, {})
    }

    public getTransaction (accountId: number): Observable<Transaction> {
        return this._sloth.getOne(`accounts/${accountId}`, Transaction, {});
    }

    public createTransaction (transaction: { account_name: string, starting_amount: number }): Observable<Transaction> {
        return this._sloth.post (`accounts`, transaction, {});
    }

    public updateTransaction (transaction: Transaction): Observable<Transaction> {
        return this._sloth.put(`accounts/${transaction.transactionId}`, transaction.toHttpParams(), Transaction, {});
    }
}