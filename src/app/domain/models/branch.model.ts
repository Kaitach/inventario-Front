import { IProductModel } from './product.model';
import { IUserModel } from './user.model';

export interface IBranchModel {
  id: string;
  name: string;
  location: string;
  products: IProductModel[];
  users: IUserModel[];
}
