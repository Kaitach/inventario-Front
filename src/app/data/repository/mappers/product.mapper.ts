import { Mapper } from '@domain/base';
import { IProductModel } from '@domain/models';
import { IProductEntity } from '..';

export class ProductImplementationRepositoryMapper extends Mapper<
  IProductEntity,
  IProductModel
> {
  mapFrom(param: IProductEntity): IProductModel {
    return {
      branchId: param.branchId,
      category: param.category,
      description: param.description,
      name: param.name,
      price: param.price,
      productId: param.productId,
      quantity: param.quantity,
    };
  }
  mapTo(param: IProductModel): IProductEntity {
    return {
      branchId: param.branchId,
      category: param.category,
      description: param.description,
      name: param.name,
      price: param.price,
      productId: param.productId,
      quantity: param.quantity,
    };
  }
}
