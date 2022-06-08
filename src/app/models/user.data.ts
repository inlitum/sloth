export class SlothUser {
    private _id: number | undefined;
    private _username: string | undefined;
    public email: string | undefined;
    public password: string | undefined;

    get id (): number | undefined {
        return this._id;
    }

    set id (value: number | undefined) {
        this._id = value;
    }

    get username (): string | undefined {
        return this._username;
    }

    set username (value: string | undefined) {
        this._username = value;
    }

    // get email (): string | undefined {
    //     return this._email;
    // }
    //
    // set email (value: string | undefined) {
    //     this._email = value;
    // }
    //
    // get password (): string | undefined {
    //     return this._password;
    // }
    //
    // set password (value: string | undefined) {
    //     this._password = value;
    // }
}
