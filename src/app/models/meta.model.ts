import { Model } from './model';

export class Meta extends Model {

    private _total: number | null       = null;
    private _perPage: number | null     = null;
    private _currentPage: number | null = null;
    private _lastPage: number | null    = null;
    private _firstPage: number | null   = null;

    constructor (data: { [key: string]: any }) {
        super();
        this.processJson(data);
    }


    get total (): number | null {
        return this._total;
    }

    set total (value: number | null) {
        this._total = value;
    }

    get perPage (): number | null {
        return this._perPage;
    }

    set perPage (value: number | null) {
        this._perPage = value;
    }

    get currentPage (): number | null {
        return this._currentPage;
    }

    set currentPage (value: number | null) {
        this._currentPage = value;
    }

    get lastPage (): number | null {
        return this._lastPage;
    }

    set lastPage (value: number | null) {
        this._lastPage = value;
    }

    get firstPage (): number | null {
        return this._firstPage;
    }

    set firstPage (value: number | null) {
        this._firstPage = value;
    }
}
