import { Component, OnInit } from '@angular/core';
import { UsersService }      from '../../../services/users.service';
import { User }              from '../../../models/user.model';
import { Router }            from '@angular/router';
import { ParameterMap }      from '../../../services/sloth-backend.service';
import { Meta }              from '../../../models/meta.model';

@Component({
               selector   : 'app-admin-user-search',
               templateUrl: './admin-user-search.component.html',
               styleUrls  : [ './admin-user-search.component.scss' ],
           })
export class AdminUserSearchComponent implements OnInit {

    public users: User[] = [];
    public userMeta: Meta | null = null;
    public currentPage: number = 1;
    public pageSize: number = 22;
    public sortColumn: string = 'username';
    public sortDirection: string = 'asc';

    constructor (
        private _userService: UsersService,
        private _router: Router
    ) { }

    ngOnInit (): void {
        this.getUsers()
    }

    private getUsers() {
        let options: ParameterMap = {
            page: this.currentPage.toString(),
            perPage: this.pageSize.toString(),
            orderBy: this.sortColumn,
            orderDirection: this.sortDirection
        }

        for (let i = 0; i < 10; i++) {
            let data = {
                user_id: i,
                username: `jack ${i}`,
                email: `jack${i}@email.com`
            }
            this.users.push(new User(data));

        }

        // this._userService.getAllUsers(options).subscribe((response) => {
        //     this.users = response.data;
        //     this.userMeta = response.meta;
        // })
    }

    openUser (userId: number): void {
      console.log(userId)
    }

    editUser (userId: number): void {
        this._router.navigate([`admin/user/${userId}`]);
    }

    deleteUser (userId: number): void {
        console.log(userId)
    }

    firstPage () {
        this.currentPage = this.userMeta ? this.userMeta.firstPage ? this.userMeta.firstPage : 1 : 1;
        this.getUsers();
    }

    previousPage () {
        this.currentPage--;
        this.getUsers();
    }

    nextPage () {
        this.currentPage++;
        this.getUsers();
    }

    lastPage () {
        this.currentPage = this.userMeta ? this.userMeta.lastPage ? this.userMeta.lastPage : 1 : 1;
        this.getUsers();
    }

}
