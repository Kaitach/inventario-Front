import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRepository, productModel } from 'src/app/domain';
import { ProductImplementationRepositoryMapper } from './mappers/product.mapper';
import { SaleModel } from 'src/app/domain/models/sale.model';


@Injectable({
  providedIn: 'root',
})
export class ProductImplementationRepository extends ProductRepository<productModel> {
   backendApiUri = window._env.BACKEND_API_URI;
   backendApiUriPersistence = window._env.PERSISTENCE_API_URI;

   apiUrl = `http://${this.backendApiUri}/api/v1/product/`;
   apiUrlGEt = `http://${this.backendApiUriPersistence}/api/v1/product/`;

  override getAllProduct(): Observable<productModel[]> {

    return this.http.get<productModel[]>(this.apiUrlGEt)
    } 
   
    returnSale(data: SaleModel): Observable<SaleModel> {
      return this.http.post<SaleModel>(
        `${this.apiUrl}returnSale`,
        data
      )  }

  registerProduct(data: productModel): Observable<productModel> {
    return this.http.post<productModel>(
      `${this.apiUrl}register`,
      data
    )  }
  registerquantity(data: productModel,url:string): Observable<productModel> {
    return this.http.post<productModel>(
      `${this.apiUrl}purchase/${url}`,
      data
    )  }
   registerCustomerSale(data: productModel,url:string): Observable<productModel> {
    return this.http.post<productModel>(
      `${this.apiUrl}customer-sale/${url}`,
      data
    )  }
   registerResellerSale(data: productModel,url:string): Observable<productModel> {
    return this.http.post<productModel>(
      `${this.apiUrl}seller-sale/${url}`,
      data
    )  }
   getProductById(id: string): Observable<productModel> {
    return this.http
    .get<productModel>(`${this.apiUrlGEt}${id}`)
    }
  ProductMapper = new ProductImplementationRepositoryMapper();
  constructor(private http: HttpClient) {
    super();
  }


}
