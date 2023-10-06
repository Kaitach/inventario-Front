import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import {  ProductRepository, productModel } from '../..';


export class RegisterCustomerSaleUseCase {
  constructor(private ProductRepository: ProductRepository<productModel>) {}

  execute(product: productModel, url:string): Observable<productModel> {


    return this.ProductRepository.registerCustomerSale(product, url);
  }
}
