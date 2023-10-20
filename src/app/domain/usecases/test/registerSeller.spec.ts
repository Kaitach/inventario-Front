import { productModel } from "../../models";
import { ProductRepository } from "../../repository";
import { registerReSellerUseCase } from "../product/registerSellerSaleUseCase";
import { of, Observable } from 'rxjs';

describe('registerReSellerUseCase', () => {
    let productRepository: ProductRepository<productModel>;
    let useCase: registerReSellerUseCase;

    beforeEach(() => {
        productRepository = jasmine.createSpyObj('ProductRepository', ['registerResellerSale']);
        useCase = new registerReSellerUseCase(productRepository);
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
    
        (productRepository.registerResellerSale as jasmine.Spy).and.returnValue(of(productData));
    
        const result = useCase.execute(productData, url);
    
        expect(productRepository.registerResellerSale).toHaveBeenCalledWith(productData, url);
    
        expect(result instanceof Observable).toBe(true);
      });
    });
