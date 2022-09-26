import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }                 from 'rxjs';
import { AppInjector }                  from '../app.module';
import { AuthService }                  from '../services/auth.service';

@Component ( {
    selector:    'app-base-component',
    template: ''
} )
export abstract class BaseComponent implements OnInit, OnDestroy{

    protected subscriptions: Subscription = new Subscription();

    private _auth: AuthService | null = null;

    protected constructor () {
        this._auth = AppInjector.get(AuthService);
    }

    public hasReadGroup (group: string): boolean {
        // TODO For some reason at this point, the status does not have any functions???
        return true;
    }

    public ngOnDestroy () {
        this.subscriptions.unsubscribe();
        this.onDestroy();
    }

    public ngOnInit (): void {
        this.onInit();
    }

    public abstract onInit(): void;
    public abstract onDestroy(): void;
}
