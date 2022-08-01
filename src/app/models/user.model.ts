import { Model } from './model';

export class User extends Model {

  private _userId: number | null   = null;
  private _username: string | null = null;
  private _email: string | null    = null;
  private _password: string | null = null;

  constructor ( data: { [key: string]: any } ) {
    super();
    this.processJson( data );
  }

  get userId (): number | null {
    return this._userId;
  }

  set userId ( value: number | null ) {
    this._userId = value;
  }

  get username (): string | null {
    return this._username;
  }

  set username ( value: string | null ) {
    this._username = value;
  }

  get email (): string | null {
    return this._email;
  }

  set email ( value: string | null ) {
    this._email = value;
  }

  get password (): string | null {
    return this._password;
  }

  set password ( value: string | null ) {
    this._password = value;
  }
}
