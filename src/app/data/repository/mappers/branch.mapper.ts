import { Mapper } from '@domain/base';
import { IBranchModel } from '@domain/models';
import { BranchEntity } from '../entities';

export class BranchImplementationRepositoryMapper extends Mapper<
  BranchEntity,
  IBranchModel
> {
  mapFrom(param: BranchEntity): IBranchModel {
    return {
      id: param.branchId,
      location: param.location,
      name: param.name,
      products: [],
      users: [],
    };
  }
  mapTo(param: IBranchModel): BranchEntity {
    return {
      branchId: param.id,
      location: param.location,
      name: param.name,
      products: [],
      users: [],
    };
  }
}
