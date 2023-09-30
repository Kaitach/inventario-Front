import { Observable } from 'rxjs';
import { productModel } from '../models';
import { productInventoryModel } from '../models/productInventory.model';
import { IProductRegisterModel } from '../models/productRegisterModel';

export abstract class ProductRepository<T> {

  abstract getProductById(id: string): Observable<T>;
  abstract registerProduct(data: IProductRegisterModel): Observable<T>;
  abstract registerquantity(data: productInventoryModel, url:string): Observable<T>;
  abstract registerCustomerSale(data: T): Observable<T>;
  abstract registerResellerSale(data: T): Observable<T>;
  abstract getAllProduct(): Observable<T[]>;
}
