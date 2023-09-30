import { productModel } from './product.model';
import { UserModel } from './user.model';

export interface IBranchModel {
  branchId: string;
  name: string;
  location: string;
  products: productModel[];
  users: UserModel[];
}
