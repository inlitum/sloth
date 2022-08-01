import { Component, OnInit } from '@angular/core';
import { UsersService }      from '../../../services/users.service';

@Component({
  selector: 'app-admin-user-search',
  templateUrl: './admin-user-search.component.html',
  styleUrls: ['./admin-user-search.component.scss']
})
export class AdminUserSearchComponent implements OnInit {

  constructor(
    private _userService: UsersService
  ) { }

  ngOnInit(): void {
    this._userService.getAllUsers().subscribe((data) => {
      console.log(data)
    })
  }

}
