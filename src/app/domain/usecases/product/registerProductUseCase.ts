import { Observable } from 'rxjs';
import { ProductRepository, productModel } from '../..';
import { IProductRegisterModel } from '../../models/productRegisterModel';


export class CreateProductUseCase  {
  constructor(private ProductRepository: ProductRepository<productModel>) {}

  execute(product: IProductRegisterModel): Observable<productModel> {


    return this.ProductRepository.registerProduct(product);
  }
}
