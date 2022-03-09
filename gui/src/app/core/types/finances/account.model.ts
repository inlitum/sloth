export class Account {

    private _id: number | undefined;

    private _name: string | undefined;
    private _currentAmount: number | undefined;

    private _creatorId: number | undefined;
    // private Creator

    // private _users: User[] = [];

    // private _transactions: Transaction[] = [];

    get id (): number | undefined {
        return this._id;
    }

    set id (value: number | undefined) {
        this._id = value;
    }

    get name (): string | undefined {
        return this._name;
    }

    set name (value: string | undefined) {
        this._name = value;
    }

    get currentAmount (): number | undefined {
        return this._currentAmount;
    }

    set currentAmount (value: number | undefined) {
        this._currentAmount = value;
    }

    get creatorId (): number | undefined {
        return this._creatorId;
    }

    set creatorId (value: number | undefined) {
        this._creatorId = value;
    }
}
