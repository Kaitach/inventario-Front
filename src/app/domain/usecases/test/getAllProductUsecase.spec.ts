import { of, Observable } from 'rxjs';
import { productModel } from '../../models';
import { ProductRepository } from '../../repository';
import { getAllProductUseCase } from '../product/getAllProductUseCase';


describe('getAllProductUseCase', () => {
  let productRepository: ProductRepository<productModel>;
  let useCase: getAllProductUseCase;

  beforeEach(() => {
    productRepository = jasmine.createSpyObj('ProductRepository', ['getAllProduct']);
    useCase = new getAllProductUseCase(productRepository);
  });

  it('should execute the use case', () => {
    const fakeProducts: productModel[] = [
    ];

    (productRepository.getAllProduct as jasmine.Spy).and.returnValue(of(fakeProducts));

    const result = useCase.execute();

    expect(productRepository.getAllProduct).toHaveBeenCalledWith();

    expect(result instanceof Observable).toBe(true);

    result.subscribe((products) => {
      expect(products).toEqual(fakeProducts);
    });
  });
});
