import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import {  ProductRepository, productModel } from '../..';


export class registerReSellerUseCase implements UseCase<productModel, productModel> {
  constructor(private ProductRepository: ProductRepository<productModel>) {}

  execute(product: productModel): Observable<productModel> {


    return this.ProductRepository.registerResellerSale(product);
  }
}
