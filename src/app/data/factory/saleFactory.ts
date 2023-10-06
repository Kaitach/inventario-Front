import { SaleRepository } from '@domain/repository/sales.repository';
import { CreateSaleUseCase } from '@domain/use-case';
export const createSaleUseCaseFactory = (saleRepository: SaleRepository) =>
  new CreateSaleUseCase(saleRepository);

export const SaleUseCaseProviders = {
  createSale: {
    provide: CreateSaleUseCase,
    useFactory: createSaleUseCaseFactory,
    deps: [SaleRepository],
  },
};
