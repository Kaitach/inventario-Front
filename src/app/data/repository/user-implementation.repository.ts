import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRepository, UserModel } from 'src/app/domain';
import { UserImplementationRepositoryMapper } from './mappers';
import { IuserRegister } from 'src/app/domain/models/userRegister';
import { IUserLogin } from 'src/app/domain/models/userLogin';

@Injectable({
  providedIn: 'root',
})



export class UserImplementationRepository extends UserRepository {
  userMapper = new UserImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }
  

  createUser(user: IuserRegister): Observable<UserModel> {
    const backendApiUri = window._env.BACKEND_API_URI;
  

    return this.http.post<UserModel>(`http://${backendApiUri}/api/v1/user/register`, user)  

    
  }
  login(user: IUserLogin): Observable<UserModel> {
    const backendApiUriLogin = window._env.BACKENDLOGIN_API_URI;
    return this.http.post<UserModel>(`http://${backendApiUriLogin}/auth/login`, user)  

    
  }
}
