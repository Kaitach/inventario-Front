import { SaleModel } from 'src/app/domain/models/sale.model';
import { Mapper, productModel } from '../../../domain';
import { SaleEntity } from '../entities/sale.entity';

export class SaleImplementationRepositoryMapper extends Mapper<
SaleEntity,
SaleModel
> {
  mapFrom(param: SaleEntity): SaleEntity {
    return {
      invoiceNumber: param.invoiceNumber,
      productName: param.productName,
      productPrice: param.productPrice,
      quantity: param.quantity

    };
  }
  mapTo(param: SaleModel): SaleEntity {
    return {
     invoiceNumber: param.invoiceNumber,
      productName: param.productName,
      productPrice: param.productPrice,
      quantity: param.quantity
    };
  }
}
