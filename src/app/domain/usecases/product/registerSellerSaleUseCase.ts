import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import {  ProductRepository, productModel } from '../..';


export class registerReSellerUseCase  {
  constructor(private ProductRepository: ProductRepository<productModel>) {}

  execute(product: productModel, url:string): Observable<productModel> {


    return this.ProductRepository.registerResellerSale(product, url);
  }
}
