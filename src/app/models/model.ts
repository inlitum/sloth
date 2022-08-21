import { camelCase as _camelCase, snakeCase as _snakeCase, isEmpty as _isEmpty, isNumber as _isNumber, toNumber as _toNumber, isBoolean as _isBoolean } from 'lodash';
import * as moment from "moment";

export interface SimpleParameterMap {
  [param: string]: string | string[];
}

export type ModelConstructor<T> = new (data: { [key: string]: any }) => T;

export class Model {

  private _creationDate: Date = new Date();
  private _updateDate: Date    = new Date();

  get creationDate (): Date {
    return this._creationDate;
  }

  set creationDate (value: Date) {
    this._creationDate = value;
  }

  get updateDate (): Date {
    return this._updateDate;
  }

  set updateDate (value: Date) {
    this._updateDate = value;
  }

  constructor () {
  }

  public processJson (data: { [key: string]: any }): void {
    if (_isEmpty(data)) {
      return;
    }

    Object.keys(data).forEach(key => {

      let property         = Model.apiToPropertyName(key);
      let propertyAccessor = Model.apiToAccessorName(key);

      if (!Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), propertyAccessor)) {
        propertyAccessor = property;
      }

      if (Object.getOwnPropertyDescriptor(this, property)) {
        // @ts-ignore
        if (_isNumber(data[key])) {
          // @ts-ignore
          this [propertyAccessor] = _toNumber(data[key]);
          // @ts-ignore
        } else if (moment(data[key], moment.ISO_8601, true).isValid()) {
          // @ts-ignore
          this [propertyAccessor] = moment(data[key], moment.ISO_8601, true).toDate();
        } else if (_isBoolean(data[key])) {
          // @ts-ignore
          this [propertyAccessor] = data[key];
        } else {
          // @ts-ignore
          this [propertyAccessor] = data[key];
        }
      }
    });
  }

  protected getSerialisationKeys (): string[] {
    const keys: string[] = Object.keys(this);
    // In addition to the properties that are ignored because they're
    // decorated with @ModelIgnore, we also ignore keys that don't start
    // with an underscore.
    return keys.filter((key) => key.charAt(0) === '_');
  }

  public toHttpParams (): SimpleParameterMap {
    const params = {};

    // Here we go - convert
    this.getSerialisationKeys().forEach(
      (key) => {
        let parameterName = '';
        try {
          parameterName = Model.accessorToddWscName(key);
        } catch (e) {
          throw new Error(`Can't HTTP-param an object with an invalid property (${ this.constructor.name }.${ key }). Model classes must only have properties in the form _propName: ${ e }`);
        }
        // @ts-ignore
        if (_.isNil(this[key])) {
          return;
        }
        // @ts-ignore
        if (typeof this [key] === 'number') {
          // @ts-ignore
          params[parameterName] = '' + this[key];
          // @ts-ignore
        } else if (typeof this [key] === 'string') {
          // @ts-ignore
          params[parameterName] = this[key];
          // @ts-ignore
        } else if (typeof this [key] === 'boolean') {
          // @ts-ignore
          params [parameterName] = this[key] ? '1' : '0';
          // @ts-ignore
        } else if ( this [key] instanceof Date ) {
            // @ts-ignore
            params[parameterName] = this[key].toUTCString( 'YYYY-MM-DDTHH:mm:ss' );
        } else {
          throw new Error('TODO: toHttpParams'); // TODO
        }
      },
    );

    return params;
  }

  public static propertyToddWscName (name: string): string {
    if (name.length < 2 || name.charAt(0) !== '_') {
      throw new Error('Model properties must be named in the form _propName (camel case with leading underscore). Please correct your model.');
    }
    return _snakeCase(name);
  }

  public static accessorToddWscName (name: string): string {
    return _snakeCase(name);
  }

  private static apiToPropertyName (key: string): string {

    let camelCased = _camelCase(key);

    return `_${ camelCased }`;
  }

  private static apiToAccessorName (key: string): string {
    return _camelCase(key);
  }
}
