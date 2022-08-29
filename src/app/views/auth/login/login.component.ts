import { HttpClient }          from '@angular/common/http';
import { Component, OnInit }   from '@angular/core';
import { User }                from '../../../models/user.model';
import { SlothBackendService } from '../../../services/sloth-backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _slothBackend: SlothBackendService,
    private _httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  login() {
    let user = new User({});
    user.email = "jackborrie@hotmail.com";
    user.password = "su";

    this._slothBackend.login(user);
  }

  test () {
    this._httpClient.get('http://localhost:3333/api/admin/users').subscribe((e) => {
      console.log(e)
    })
  }

}
