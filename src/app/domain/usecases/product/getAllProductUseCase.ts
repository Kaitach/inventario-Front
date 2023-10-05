import { Observable } from 'rxjs';
import { ProductRepository, productModel } from '../..';


export class getAllProductUseCase  {
  constructor(private ProductRepository: ProductRepository<productModel>) {}

  execute(): Observable<productModel[]> {
    return this.ProductRepository.getAllProduct();
  }


}
