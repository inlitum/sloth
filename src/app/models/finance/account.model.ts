import { Model }       from '../model';

export class Account extends Model {

    private _id: number                     = 0;
    private _name: string                   = '';
    private _initialBalance: number          = 0;
    private _userId: number                 = 0;
    // private _transactions: Transaction[]    = [];

    get id (): number {
        return this._id;
    }

    set id (value: number) {
        this._id = value;
    }

    get name (): string {
        return this._name;
    }

    set name (value: string) {
        this._name = value;
    }

    get initialBalance (): number {
        return this._initialBalance;
    }

    set initialBalance (value: number) {
        this._initialBalance = value;
    }

    get userId (): number {
        return this._userId;
    }

    set userId (value: number) {
        this._userId = value;
    }

    // get transactions (): Transaction[] {
    //     return this._transactions;
    // }

    // set transactions (value: Transaction[]) {
    //     this._transactions = value;
    // }

    constructor (data: { [ key: string ]: any }) {
        super ();
        this.processJson (data);
    }
}
