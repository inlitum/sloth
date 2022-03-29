import { Model } from '../model';

export class Transaction extends Model {

    private _id: number        = -1;
    private _userId: number    = -1;
    private _reason: string    = '';
    private _amount: number    = -1;
    private _deposit: boolean  = false;
    private _accountId: number = -1;

    constructor (data: {[key: string]: any}) {
        super ();
        this.processJson(data);
    }

    get id (): number {
        return this._id;
    }

    set id (value: number) {
        this._id = value;
    }

    get userId (): number {
        return this._userId;
    }

    set userId (value: number) {
        this._userId = value;
    }

    get reason (): string {
        return this._reason;
    }

    set reason (value: string) {
        this._reason = value;
    }

    get amount (): number {
        return this._amount;
    }

    set amount (value: number) {
        this._amount = value;
    }

    get deposit (): boolean {
        return this._deposit;
    }

    set deposit (value: boolean) {
        this._deposit = value;
    }

    get accountId (): number {
        return this._accountId;
    }

    set accountId (value: number) {
        this._accountId = value;
    }
}
