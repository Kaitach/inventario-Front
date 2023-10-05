import { Mapper } from '@domain/base';
import { ISaleModel } from '@domain/models';
import { ISaleEntity } from '../entities';
export class SaleImplementationRepositoryMapper extends Mapper<
  ISaleEntity,
  ISaleModel
> {
  mapFrom(param: ISaleEntity) {
    return {
      id: param.id,
      number: param.number,
      products: param.products,
      total: param.total,
      date: param.date,
    };
  }
  mapTo(param: ISaleModel) {
    return {
      id: param.id,
      number: param.number,
      products: param.products,
      total: param.total,
      date: param.date,
    };
  }
}
