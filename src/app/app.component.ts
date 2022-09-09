import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router }                                                             from '@angular/router';
import { Subscription }                                                                      from 'rxjs';
import { AuthService }                                                                       from './services/auth.service';
import { HeaderService }                                                                     from './services/header.service';
import { SidebarService }                                                                    from './services/sidebar.service';

@Component ({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild ('dropdownButton')
  dropdownButton: ElementRef | undefined;

  public loading: boolean = false;

  private subscriptions: Subscription = new Subscription();

  public constructor (
      private _headerService: HeaderService
      , private _renderer: Renderer2
      , private _changeDetector: ChangeDetectorRef
      , private _auth: AuthService
      , private _router: Router
      , private _sidebarService: SidebarService
  ) {
      this._headerService.setPageName (null);
  }

  ngOnDestroy (): void {
          this.subscriptions.unsubscribe ();
  }

  ngOnInit (): void {
      let loadingSubscription = this._headerService.loading$.subscribe ((loading) => {
          this.loading = loading;
          this._changeDetector.detectChanges ();
      });

      let routeChangeSub = this._router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
              if (event.url !== 'login') {
                  this._sidebarService.setVisibility('full-size');
              } else {
                  this._sidebarService.setVisibility('hidden');
              }
          }
      })

      this._auth.checkForSession();
      this._auth.fetchStatus();

      this.subscriptions.add(loadingSubscription);
      this.subscriptions.add(routeChangeSub);
  }

}
