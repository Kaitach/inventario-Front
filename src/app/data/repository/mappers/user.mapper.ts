import { Mapper } from '@domain/base';
import { IUserModel } from '@domain/models';
import { IUserEntity } from '../entities';

export class UserImplementationRepositoryMapper extends Mapper<
  IUserEntity,
  IUserModel
> {
  mapFrom(param: IUserEntity): IUserModel {
    return {
      id: param.id,
      role: param.role,
      email: param.email,
      name: param.name,
      password: param.password,
      branchId: param.branchId,
    };
  }
  mapTo(param: IUserModel): IUserEntity {
    return {
      id: param.id,
      role: param.role,
      email: param.email,
      name: param.name,
      password: param.password,
      branchId: param.branchId,
    };
  }
}
