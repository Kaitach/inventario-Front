import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { UserRepository } from '../../repository/user.repository';
import { IuserRegister } from '../../models/userRegister';
import { IUserLogin } from '../../models/userLogin';

export class LoginUserUseCase  {
  constructor(private UserRepository: UserRepository) {}

  execute(user: IUserLogin): Observable<UserModel> {


    return this.UserRepository.login(user);
  }
}
