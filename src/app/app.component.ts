import { Component }     from '@angular/core';
import { HeaderService } from './core/services/header.service';

@Component ({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent {

    public constructor (private _headerService: HeaderService) {
        this._headerService.setPageName (null);
    }

}
