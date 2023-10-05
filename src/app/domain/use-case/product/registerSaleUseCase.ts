import { UseCase } from '@domain/base';
import { IProductSaleModel } from '@domain/models';
import { ProductRepository } from '@domain/repository';
import { Observable } from 'rxjs';

export class RegisterCustomerSaleUseCase
  implements UseCase<IProductSaleModel, IProductSaleModel>
{
  constructor(
    private productRepository: ProductRepository<IProductSaleModel>
  ) {}

  execute(product: IProductSaleModel): Observable<IProductSaleModel> {
    return this.productRepository.registerCustomerSale(product);
  }
}
