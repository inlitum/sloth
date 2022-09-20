import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule }                            from '@angular/core';
import { BrowserModule }                       from '@angular/platform-browser';
import { BrowserAnimationsModule }             from '@angular/platform-browser/animations';
import { RouterModule }                        from '@angular/router';

import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';
import { ComponentsModule }         from './components/components.module';
import { SlothColumnNameDirective } from './directives/sloth-column-name.directive';
import { AuthInterceptor }          from './interceptors/auth.interceptor';
import { PrettyCurrencyPipe }       from './pipes/pretty-currency.pipe';
import { ViewsModule }              from './views/views.module';

@NgModule({
              declarations: [
                  AppComponent,
                  SlothColumnNameDirective,
                  PrettyCurrencyPipe,
              ],
              imports     : [
                  BrowserModule,
                  HttpClientModule,
                  RouterModule,
                  AppRoutingModule,
                  BrowserAnimationsModule,
                  ViewsModule,
                  ComponentsModule,
              ],
              providers   : [
                  {
                      provide : HTTP_INTERCEPTORS,
                      useClass: AuthInterceptor,
                      multi   : true,
                  },
              ],
              exports     : [
                  PrettyCurrencyPipe,
              ],
              bootstrap   : [ AppComponent ],
          })
export class AppModule { }
