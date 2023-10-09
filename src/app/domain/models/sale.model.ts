export interface ISaleModel {
  products: {
    id: string;
    quantity: number;
  }[];
  branchId: string;
}
