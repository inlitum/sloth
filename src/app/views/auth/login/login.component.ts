import { Component, OnInit }   from '@angular/core';
import { UserSession }         from '../../../models/user-session.model';
import { AuthService }         from '../../../services/auth.service';
import { SidebarService }      from '../../../services/sidebar.service';
import { SlothBackendService } from '../../../services/sloth-backend.service';

@Component ({
                selector   : 'app-login',
                templateUrl: './login.component.html',
                styleUrls  : [ './login.component.scss' ],
            })
export class LoginComponent implements OnInit {

    constructor (
        private _sloth: SlothBackendService,
        private _authService: AuthService,
        private _sidebarService: SidebarService
    ) { }

    ngOnInit (): void {
        this._sidebarService.setVisibility('hidden');

        this._authService.dirtySession();
    }

    login () {
        let user      = new UserSession ({});
        user.email    = 'jackborrie@hotmail.com';
        user.password = 'su';

        this._authService.login (user);
    }

}
