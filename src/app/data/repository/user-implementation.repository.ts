import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserModel, IUserRegister } from '@domain/models';
import { UserRepository } from '@domain/repository';
import { Observable } from 'rxjs';
import { UserImplementationRepositoryMapper } from './mappers';

@Injectable({
  providedIn: 'root',
})
export class UserImplementationRepository extends UserRepository {
  userMapper = new UserImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  createUser(user: IUserRegister): Observable<IUserModel> {
    return this.http.post<IUserModel>(
      'http://localhost:3000/api/v1/user/register',
      user
    );
  }
}
