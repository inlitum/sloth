import { Model } from '../model';

export class Account extends Model {

    private _accountId: number | null   = null;
    private _accountName: string | null = null;
    private _balance: number | null     = null;
    private _userId: number | null      = null;

    get accountId (): number | null {
        return this._accountId;
    }

    set accountId (value: number | null) {
        this._accountId = value;
    }

    get accountName (): string | null {
        return this._accountName;
    }

    set accountName (value: string | null) {
        this._accountName = value;
    }

    get balance (): number | null {
        return this._balance;
    }

    set balance (value: number | null) {
        this._balance = value;
    }

    get userId (): number | null {
        return this._userId;
    }

    set userId (value: number | null) {
        this._userId = value;
    }

    constructor (data: { [key: string]: any } | null = null) {
        super ();
        if (data != null) {
            this.processJson (data);
        }
    }
}
