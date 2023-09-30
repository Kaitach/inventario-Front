import { IproductEntity } from '..';
import { Mapper, productModel } from '../../../domain';

export class ProductImplementationRepositoryMapper extends Mapper<
IproductEntity,
  productModel
> {
  mapFrom(param: IproductEntity): productModel {
    return {
      branchId: param.branchId,
      category: param.category,
      description: param.description,
      name: param.name,
      price: param.price,
      productId: param.productId,
      quantity: param.quantity
    };
  }
  mapTo(param: productModel): IproductEntity {
    return {
      branchId: param.branchId,
      category: param.category,
      description: param.description,
      name: param.name,
      price: param.price,
      productId: param.productId,
      quantity: param.quantity
    };
  }
}
