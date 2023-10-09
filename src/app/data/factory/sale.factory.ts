import { SaleRepository } from '@domain/repository';
import { CreateSaleUseCase } from '@domain/use-case';
export const CreateSaleUseCaseFactory = (saleRepository: SaleRepository) =>
  new CreateSaleUseCase(saleRepository);

export const SaleUseCaseProviders = {
  createSale: {
    provide: CreateSaleUseCase,
    useFactory: CreateSaleUseCaseFactory,
    deps: [SaleRepository],
  },
};
