import { Injectable }          from '@angular/core';
import { SlothBackendService } from './sloth-backend.service';

@Injectable( {
               providedIn: 'root',
             } )
export class UsersService {

  constructor (
    private _slothBackend: SlothBackendService,
  ) { }

  // public getAllUsers(options: ParameterMap = {}): Observable<any> {
  //   return this._slothBackend.getList("admin/users", User, options);
  // }
}
