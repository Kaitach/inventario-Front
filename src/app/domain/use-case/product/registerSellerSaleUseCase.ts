import { UseCase } from '@domain/base';
import { IProductSaleModel } from '@domain/models';
import { ProductRepository } from '@domain/repository';
import { Observable } from 'rxjs';

export class RegisterSellerUseCase
  implements UseCase<IProductSaleModel, IProductSaleModel>
{
  constructor(
    private ProductRepository: ProductRepository<IProductSaleModel>
  ) {}

  execute(product: IProductSaleModel): Observable<IProductSaleModel> {
    return this.ProductRepository.registerResellerSale(product);
  }
}
