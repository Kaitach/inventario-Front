import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { IuserRegister } from '../models/userRegister';
import { IUserLogin } from '../models/userLogin';
@Injectable({
  providedIn: 'root'
})

export abstract class UserRepository{
  abstract createUser(user: IuserRegister): Observable<UserModel>;
  abstract login(user: IUserLogin): Observable<any>;


}
