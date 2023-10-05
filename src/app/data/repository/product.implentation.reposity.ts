import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRepository, productModel } from 'src/app/domain';
import { ProductImplementationRepositoryMapper } from './mappers/product.mapper';


@Injectable({
  providedIn: 'root',
})
export class ProductImplementationRepository extends ProductRepository<productModel> {
   apiUrl = 'http://localhost:3000/api/v1/product/';
   apiUrlGEt = 'http://localhost:3002/api/v1/product/';

  override getAllProduct(): Observable<productModel[]> {

    return this.http.get<productModel[]>(this.apiUrlGEt)
    } 
   


  registerProduct(data: productModel): Observable<productModel> {
    return this.http.post<productModel>(
      `${this.apiUrl}register`,
      data
    )  }
  registerquantity(data: productModel,url:string): Observable<productModel> {
    return this.http.post<productModel>(
      `${this.apiUrl}${url}/${data.productId}`,
      data
    )  }
   registerCustomerSale(data: productModel): Observable<productModel> {
    return this.http.post<productModel>(
      `${this.apiUrl}customer-sale/${data.productId}`,
      data
    )  }
   registerResellerSale(data: productModel): Observable<productModel> {
    return this.http.post<productModel>(
      `${this.apiUrl}seller-sale/${data.productId}`,
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
