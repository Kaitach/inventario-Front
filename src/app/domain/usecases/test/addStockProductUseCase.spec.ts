import { Observable, of } from 'rxjs';
import { ProductRepository, productModel } from '../..';
import { productInventoryModel } from '../../models/productInventory.model';
import { RegisterQuantityUseCase } from '../product/addStockProductUseCase';

describe('RegisterQuantityUseCase', () => {
    let productRepository: ProductRepository<productModel>;
    let useCase: RegisterQuantityUseCase;
  
    beforeEach(() => {
      productRepository = jasmine.createSpyObj('ProductRepository', ['registerquantity']);
      useCase = new RegisterQuantityUseCase(productRepository);
    });
  
    it('should execute the use case', () => {
      const productData: productInventoryModel = {
        productId: '',
        quantity: 0,
        branchId: ''
      };
      const url = 'https://example.com/some-url';
  
      (productRepository.registerquantity as jasmine.Spy).and.returnValue(of(productData));
  
      const result = useCase.execute(productData, url);
  
      expect(productRepository.registerquantity).toHaveBeenCalledWith(productData, url);
  
      expect(result instanceof Observable).toBe(true);
    });
  });