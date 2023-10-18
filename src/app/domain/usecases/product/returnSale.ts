import { Observable } from 'rxjs';
import { ProductRepository, productModel } from '../..';
import { IProductRegisterModel } from '../../models/productRegisterModel';
import { SaleModel } from '../../models/sale.model';


export class returnSaleUseCase  {
  constructor(private ProductRepository: ProductRepository<productModel>) {}

  execute( requestBody: { branchID: string, idSale: any,product: any,  }): Observable<SaleModel> {


    return this.ProductRepository.returnSale(requestBody);
  }
}
