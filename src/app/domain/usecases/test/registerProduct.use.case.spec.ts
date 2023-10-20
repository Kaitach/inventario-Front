import { of, Observable } from 'rxjs';

import { IProductRegisterModel } from '../../models/productRegisterModel';
import { productModel } from '../../models';
import { ProductRepository } from '../../repository';
import { CreateProductUseCase } from '../product/registerProductUseCase';

describe('CreateProductUseCase', () => {
  let productRepository: ProductRepository<productModel>;
  let useCase: CreateProductUseCase;

  beforeEach(() => {
    productRepository = jasmine.createSpyObj('ProductRepository', ['registerProduct']);
    useCase = new CreateProductUseCase(productRepository);
  });

  it('should execute the use case', () => {
    const productData: IProductRegisterModel = {
        name: 'Product 1',
        description: 'Product 1 description',
        price: 10,
        category: 'Category 1',
        branchId: ''
    };

    (productRepository.registerProduct as jasmine.Spy).and.returnValue(of(productData));

    const result = useCase.execute(productData);

    expect(productRepository.registerProduct).toHaveBeenCalledWith(productData);

    expect(result instanceof Observable).toBe(true);
  });
});
