import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule }                    from './app-routing.module';
import { AppComponent }                        from './app.component';
import { BrowserAnimationsModule }             from '@angular/platform-browser/animations';
import { ViewsModule }                         from './views/views.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule }                        from '@angular/router';
import { ComponentsModule }                    from './components/components.module';
import { SlothColumnNameDirective }            from './directives/sloth-column-name.directive';
import { PrettyCurrencyPipe }                  from './pipes/pretty-currency.pipe';
import { AuthInterceptor }                     from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SlothColumnNameDirective,
    PrettyCurrencyPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ViewsModule,
    ComponentsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
