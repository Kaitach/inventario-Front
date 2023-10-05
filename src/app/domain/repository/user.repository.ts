import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserModel } from '../models/user.model';
import { IUserRegister } from '../models/userRegister';
@Injectable({
  providedIn: 'root',
})
export abstract class UserRepository {
  abstract createUser(user: IUserRegister): Observable<IUserModel>;
}
