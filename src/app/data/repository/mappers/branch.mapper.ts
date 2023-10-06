import { BranchEntity } from '..';
import { IBranchModel, Mapper } from '../../../domain';

export class BranchImplementationRepositoryMapper extends Mapper<
BranchEntity,
  IBranchModel
> {
  mapFrom(param: BranchEntity): IBranchModel {
    return {
   branchId: param.branchId,
   location: param.location,
   name: param.name,
   products: [],
   users: [],
   sales: []

    };
  }
  mapTo(param: IBranchModel): BranchEntity {
    return {
        branchId: param.branchId,
        location: param.location,
        name: param.name,
        products: [],
        users: [],
        sales: []

    };
  }
}
