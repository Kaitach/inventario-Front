import { of, Observable } from 'rxjs';
import { productModel } from '../../models';
import { ProductRepository } from '../../repository';
import { RegisterCustomerSaleUseCase } from '../product/registerSaleUseCase';

describe('RegisterCustomerSaleUseCase', () => {
  let productRepository: ProductRepository<productModel>;
  let useCase: RegisterCustomerSaleUseCase;

  beforeEach(() => {
    productRepository = jasmine.createSpyObj('ProductRepository', ['registerCustomerSale']);
    useCase = new RegisterCustomerSaleUseCase(productRepository);
  });

  it('should execute the use case', () => {
    const productData: productModel = {
      productId: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      price: 10,
      quantity: 5,
      category: 'Category 1',
      branchId: 'Branch 1'
    };
    const url = 'https://example.com/some-url';

    (productRepository.registerCustomerSale as jasmine.Spy).and.returnValue(of(productData));

    const result = useCase.execute(productData, url);

    expect(productRepository.registerCustomerSale).toHaveBeenCalledWith(productData, url);

    expect(result instanceof Observable).toBe(true);
  });
});
