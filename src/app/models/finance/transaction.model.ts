import { Model } from "../model";

export class Transaction extends Model {

    private _transactionId: number | null = null;
    private _accountId: number | null     = null;
    private _description: string | null   = null;
    private _amount: number | null        = null;

    constructor (data: { [key: string]: any } | null = null) {
        super ();
        if (data != null) {
            this.processJson (data);
        }

        console.log(this.creationDate)
    }

    get transactionId (): number | null {
        return this._transactionId;
    }

    set transactionId ( value: number | null ) {
        this._transactionId = value;
    }

    get accountId (): number | null {
        return this._accountId;
    }

    set accountId ( value: number | null ) {
        this._accountId = value;
    }

    get description (): string | null {
        return this._description;
    }

    set description ( value: string | null ) {
        this._description = value;
    }

    get amount (): number | null {
        return this._amount;
    }

    set amount ( value: number | null ) {
        this._amount = value;
    }
}