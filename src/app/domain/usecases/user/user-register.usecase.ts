import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { UserModel } from '../../models/user.model';
import { UserRepository } from '../../repository/user.repository';
import { IuserRegister } from '../../models/userRegister';

export class CreateUserUseCase  {
  constructor(private UserRepository: UserRepository) {}

  execute(user: IuserRegister): Observable<UserModel> {


    return this.UserRepository.createUser(user);
  }
}
