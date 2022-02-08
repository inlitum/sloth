import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';

// NG Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader }              from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule }     from '@angular/common/http';
import { ViewsModule }                      from './views/views.module';
import { RouterModule }                     from '@angular/router';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader (http, './assets/i18n/', '.json');

@NgModule ({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        AppRoutingModule,
        ViewsModule,
        TranslateModule.forRoot ({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [ HttpClient ]
            }
        })
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
