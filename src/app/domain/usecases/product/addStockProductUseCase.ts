import { Observable } from 'rxjs';
import { ProductRepository, productModel } from '../..';
import { productInventoryModel } from '../../models/productInventory.model';


export class RegisterQuantityUseCase  {
  constructor(private ProductRepository: ProductRepository<productModel>) {}

  execute(product: productInventoryModel,url:string): Observable<productModel> {


    return this.ProductRepository.registerquantity(product,url);
  }
}
