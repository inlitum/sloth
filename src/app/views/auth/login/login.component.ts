import { Component, OnInit }   from '@angular/core';
import { SlothBackendService } from '../../../services/sloth-backend.service';
import { User }                from '../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _slothBackend: SlothBackendService
  ) { }

  ngOnInit(): void {
  }

  login() {
    let user = new User({});
    user.email = "jackborrie@hotmail.com";
    user.password = "su";

    this._slothBackend.login(user);
  }

}
