export interface ISaleModel {
  products: {
    id: string;
    quantity: number;
  }[];
  branchId: string;
  userId?: string;
  discount?: number;
}
