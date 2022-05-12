import { Injectable }                           from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Transaction }                          from '../../types/finances/transaction.model';
import { SlothBackendService }                  from '../sloth-backend.service';
import { tap }                                  from 'rxjs/operators';
import { HeaderService }                        from '../header.service';

@Injectable ({
    providedIn: 'root'
})
export class TransactionsService {

    public transactions: Transaction[]           = [];
    public transactions$: Subject<Transaction[]> = new BehaviorSubject<Transaction[]> ([]);

    constructor (
        private _headerService: HeaderService,
        private _slothService: SlothBackendService
    ) {
    }

    public getAllTransactions (): Observable<Transaction[]> {
        return this._slothService.getList<Transaction> ('transactions', Transaction, {}).pipe (
            tap ((transactions: any) => {
                    this.transactions = transactions.data;
                    this.transactions$.next (transactions.data);
                    return transactions.data;
                }
            )
        );
    }

    public getAllTransactionsForUser (userId: number): Observable<Transaction[]> {
        return this._slothService.getList<Transaction> (`user/${userId}/transactions`, Transaction, {}).pipe (
            tap ((transactions: any) => {
                    this.transactions = transactions.data;
                    this.transactions$.next (transactions.data);
                    return transactions.data;
                }
            )
        );
    }

    public getAllTransactionsForAccount (accountId: number): Observable<Transaction[]> {
        return this._slothService.getList<Transaction> (`account/${accountId}/transactions`, Transaction, {}).pipe (
            tap ((transactions: any) => {
                    this.transactions = transactions.data;
                    this.transactions$.next (transactions.data);
                    return transactions.data;
                }
            )
        );
    }

    public createTransaction (transaction: Transaction): Observable<Transaction> {
        return this._slothService.post (`account/${transaction.accountId}/transaction`, transaction, {}).pipe (
            tap ((transactions: any) => {
                    this.transactions = transactions.data;
                    this.transactions$.next (transactions.data);
                    return transactions.data;
                }
            )
        );
    }
}
