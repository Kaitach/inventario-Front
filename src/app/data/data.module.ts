import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BranchRepository,
  ProductRepository,
  UserRepository,
} from '@domain/repository';
import { SaleRepository } from '@domain/repository/sales.repository';
import {
  BranchUseCaseProviders,
  SaleUseCaseProviders,
  productUseCaseProviders,
  userUseCaseProviders,
} from './factory';
import {
  BranchImplementationRepository,
  ProductImplementationRepository,
  UserImplementationRepository,
} from './repository';
import { SaleImplementationRepository } from './repository/sale.implementation.repository';

@NgModule({
  providers: [
    UserImplementationRepository,
    ...Object.values(userUseCaseProviders),
    { provide: UserRepository, useClass: UserImplementationRepository },
    BranchImplementationRepository,
    ...Object.values(BranchUseCaseProviders),
    { provide: BranchRepository, useClass: BranchImplementationRepository },
    ProductImplementationRepository,
    ...Object.values(productUseCaseProviders),
    { provide: ProductRepository, useClass: ProductImplementationRepository },
    SaleImplementationRepository,
    ...Object.values(SaleUseCaseProviders),
    {
      provide: SaleRepository,
      useClass: SaleImplementationRepository,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class DataModule {}
