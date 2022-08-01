import { camelCase as _camelCase, snakeCase as _snakeCase, isEmpty as _isEmpty, toNumber } from 'lodash';

export interface SimpleParameterMap {
  [param: string]: string | string[];
}

export type ModelConstructor<T> = new ( data: { [key: string]: any } ) => T;

export class Model {

  private _createdAt: Date = new Date();
  private _updatedAt: Date = new Date();

  get createdAt (): Date {
    return this._createdAt;
  }

  set createdAt ( value: Date ) {
    this._createdAt = value;
  }

  get updatedAt (): Date {
    return this._updatedAt;
  }

  set updatedAt ( value: Date ) {
    this._updatedAt = value;
  }

  constructor () {
  }

  public processJson ( data: { [key: string]: any } ): void {
    if ( _isEmpty( data ) ) {
      return;
    }

    Object.keys( data ).forEach( key => {

      let property         = Model.apiToPropertyName( key );
      let propertyAccessor = Model.apiToAccessorName( key );

      if ( !Object.getOwnPropertyDescriptor( Object.getPrototypeOf( this ), propertyAccessor ) ) {
        propertyAccessor = property;
      }

      if ( Object.getOwnPropertyDescriptor( this, property ) ) {
        // @ts-ignore
        switch ( typeof this [property] ) {
          case 'number':
            // @ts-ignore
            this [propertyAccessor] = toNumber( data[key] );
            break;
          case 'string':
            // @ts-ignore
            this [propertyAccessor] = data[key];
            break;
          case 'object':

            // Test if teh object is a date

            try {
              // @ts-ignore
              this [propertyAccessor] = new Date( data[key] );
            } catch ( e ) {
              console.log( e );
            }

            break;
          case 'boolean':
            break;
        }
      }
    } );
  }

  protected getSerialisationKeys (): string[] {
    const keys: string[] = Object.keys( this );
    // In addition to the properties that are ignored because they're
    // decorated with @ModelIgnore, we also ignore keys that don't start
    // with an underscore.
    return keys.filter( ( key ) => key.charAt( 0 ) === '_' );
  }

  public toHttpParams (): SimpleParameterMap {
    const params = {};

    // Here we go - convert
    this.getSerialisationKeys().forEach(
      ( key ) => {
        let parameterName = '';
        try {
          parameterName = Model.accessorToddWscName( key );
        } catch ( e ) {
          throw new Error( `Can't HTTP-param an object with an invalid property (${ this.constructor.name }.${ key }). Model classes must only have properties in the form _propName: ${ e }` );
        }
        // @ts-ignore
        if ( _.isNil( this[key] ) ) {
          return;
        }
        // @ts-ignore
        if ( typeof this [key] === 'number' ) {
          // @ts-ignore
          params[parameterName] = '' + this[key];
          // @ts-ignore
        } else if ( typeof this [key] === 'string' ) {
          // @ts-ignore
          params[parameterName] = this[key];
          // @ts-ignore
        } else if ( typeof this [key] === 'boolean' ) {
          // @ts-ignore
          params [parameterName] = this[key] ? '1' : '0';
          // @ts-ignore
        } else if ( this [key] instanceof Date ) {
          // @ts-ignore
          params[parameterName] = this[key].toUTCString( 'YYYY-MM-DDTHH:mm:ss' );
        } else {
          throw new Error( 'TODO: toHttpParams' ); // TODO
        }
      },
    );

    console.log('t')

    return params;
  }

  public static propertyToddWscName (name: string): string {
    if (name.length < 2 || name.charAt (0) !== '_') {
      throw new Error ('Model properties must be named in the form _propName (camel case with leading underscore). Please correct your model.');
    }
    return _snakeCase (name);
  }

  public static accessorToddWscName (name: string): string {
    return _snakeCase (name);
  }

  private static apiToPropertyName ( key: string ): string {

    let camelCased = _camelCase( key );

    return `_${ camelCased }`;
  }

  private static apiToAccessorName ( key: string ): string {
    return _camelCase( key );
  }
}
