import { camelCase as _camelCase, isEmpty as _isEmpty, toNumber } from 'lodash';

export type ModelConstructor<T> = new (data: { [ key: string ]: any }) => T;

export class Model {

    private _createdAt: Date = new Date();
    private _updatedAt: Date = new Date();

    get createdAt (): Date {
        return this._createdAt;
    }

    set createdAt (value: Date) {
        this._createdAt = value;
    }

    get updatedAt (): Date {
        return this._updatedAt;
    }

    set updatedAt (value: Date) {
        this._updatedAt = value;
    }

    constructor () {
    }

    public processJson (data: { [ key: string ]: any }): void {
        if (_isEmpty (data)) {
            return;
        }

        Object.keys (data).forEach (key => {

            let property         = Model.apiToPropertyName (key);
            let propertyAccessor = Model.apiToAccessorName (key);

            if (!Object.getOwnPropertyDescriptor (Object.getPrototypeOf (this), propertyAccessor)) {
                propertyAccessor = property;
            }

            if (Object.getOwnPropertyDescriptor (this, property)) {
                // @ts-ignore
                switch (typeof this [ property ]) {
                    case 'number':
                        // @ts-ignore
                        this [ propertyAccessor ] = toNumber (data[ key ]);
                        break;
                    case 'string':
                        // @ts-ignore
                        this [ propertyAccessor ] = data[ key ];
                        break;
                    case 'object':

                        // Test if teh object is a date

                        try {
                            // @ts-ignore
                            this [ propertyAccessor ] = new Date (data[ key ]);
                        } catch (e) {
                            console.log (e);
                        }

                        break;
                    case 'boolean':
                        break;
                }
            }
        });
    }

    private static apiToPropertyName (key: string): string {

        let camelCased = _camelCase (key);

        return `_${camelCased}`;
    }

    private static apiToAccessorName (key: string): string {
        return _camelCase (key);
    }
}
