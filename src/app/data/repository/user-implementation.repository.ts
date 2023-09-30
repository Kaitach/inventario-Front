import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRepository, UserModel } from 'src/app/domain';
import { UserImplementationRepositoryMapper } from './mappers';
import { IuserRegister } from 'src/app/domain/models/userRegister';

@Injectable({
  providedIn: 'root',
})



export class UserImplementationRepository extends UserRepository {
  userMapper = new UserImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }
  

  createUser(user: IuserRegister): Observable<UserModel> {
    return this.http.post<UserModel>('http://localhost:3000/api/v1/user/register', user)  

    
  }
}
