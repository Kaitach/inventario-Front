import { registerReSellerUseCase } from './../../domain/usecases/product/registerSellerSaleUseCase';
import { RegisterCustomerSaleUseCase } from './../../domain/usecases/product/registerSaleUseCase';
import { RegisterQuantityUseCase } from 'src/app/domain/usecases/product/addStockProductUseCase';
import { CreateProductUseCase } from './../../domain/usecases/product/registerProductUseCase';
import { ProductRepository, productModel } from 'src/app/domain';
import { getAllProductUseCase } from 'src/app/domain/usecases/product/getAllProductUseCase';

export const createProductUseCaseFactory = (
  productRepository: ProductRepository<productModel>
) => new CreateProductUseCase(productRepository);


export  const getAllProductUsecaseFactory =
(
    productRepository: ProductRepository<productModel>

)=> new getAllProductUseCase(productRepository);
export const RegisterQuantityUseCaseFactory = (
  productRepository: ProductRepository<productModel>
) => new RegisterQuantityUseCase(productRepository);

export const registerReSellerUseCaseFactory = (
  productRepository: ProductRepository<productModel>
) => new registerReSellerUseCase(productRepository);

export const registerCustomerSaleUseCaseFactory = (
    productRepository: ProductRepository<productModel>
  ) => new RegisterCustomerSaleUseCase(productRepository);
  
export const producthUseCaseProviders = {
  Createproduct: {
    provide: CreateProductUseCase,
    useFactory: createProductUseCaseFactory,
    deps: [ProductRepository],
  },
  registerQuantity: {
    provide: RegisterQuantityUseCase,
    useFactory: RegisterQuantityUseCaseFactory,
    deps: [ProductRepository],
  },
  customerSale: {
    provide: RegisterCustomerSaleUseCase,
    useFactory: registerCustomerSaleUseCaseFactory,
    deps: [ProductRepository],
  },
  sellerSale: {
    provide: registerReSellerUseCase,
    useFactory: registerReSellerUseCaseFactory,
    deps: [ProductRepository],
  },
  getAllProduct:{
    provide: getAllProductUseCase,
    useFactory: getAllProductUsecaseFactory,
    dpeps: [ProductRepository]
  }
};
