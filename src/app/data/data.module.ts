import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BranchRepository,
  ProductRepository,
  UserRepository,
} from '@domain/repository';
import {
  BranchUseCaseProviders,
  productUseCaseProviders,
  userUseCaseProviders,
} from './factory';
import {
  BranchImplementationRepository,
  ProductImplementationRepository,
  UserImplementationRepository,
} from './repository';

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
  ],
  imports: [CommonModule, HttpClientModule],
})
export class DataModule {}
