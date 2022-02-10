import { Injectable } from '@angular/core';

export interface LocalStorageData {
    returnUrl: string,

}

@Injectable ({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor () {
    }

    set (key: string, data: any): void {
        try {
            localStorage.setItem (key, JSON.stringify (data));
        } catch (e) {
            console.error ('Error saving to localStorage', e);
        }
    }

    get (key: string) {
        try {
            let data = localStorage.getItem (key);
            if (!data) {
                return null;
            }
            return JSON.parse (data);
        } catch (e) {
            console.error ('Error getting data from localStorage', e);
            return null;
        }
    }

    remove (key: string) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error ('Error removing data from localStorage', e);
        }
    }
}
