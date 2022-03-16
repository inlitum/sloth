import { Component, OnInit }   from '@angular/core';
import { SlothBackendService } from '../../../core/services/sloth-backend.service';
import { SlothUser }           from '../../../core/types/user.data';
import { AccountsService }     from '../../../core/services/finances/accounts.service';
import { Account }             from '../../../core/types/finances/account.model';

@Component ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

    constructor (
        private _slothBackend: SlothBackendService,
        private _accountsService: AccountsService
    ) {
    }

    ngOnInit (): void {
    }

    login () {
        let loginData: SlothUser = new SlothUser();

        loginData.email = 'jackborrie@hotmail.com';
        loginData.password = 'su';

        this._slothBackend.login (loginData);
    }

    get () {
        this._accountsService.getAllAccounts()
            .subscribe(accounts => {
                console.log(accounts);
            })
    }

    create () {
        let account = new Account();
        account.name = "Everyday";
        account.currentAmount = 1012.80;

        this._accountsService.createAccount(account)
            .subscribe((response) => {
                console.log(response);
                this.get();
            });
    }


}
