

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UserRepository, BranchRepository, ProductRepository } from '../domain';
import { BranchUseCaseProviders } from './factory/branchFactory';
import { userUseCaseProviders } from './factory/userfactory';
import { BranchImplementationRepository } from './repository/branch.implemntation.repositoy';
import { UserImplementationRepository } from './repository/user-implementation.repository';
import { ProductImplementationRepository } from './repository/product.implentation.reposity';
import { producthUseCaseProviders } from './factory/productFactory';

@NgModule({
  providers: [
    UserImplementationRepository,
    ...Object.values(userUseCaseProviders),
    { provide: UserRepository, useClass: UserImplementationRepository },
    BranchImplementationRepository,
    ...Object.values(BranchUseCaseProviders),
    { provide: BranchRepository, useClass: BranchImplementationRepository },
    ProductImplementationRepository,
    ...Object.values(producthUseCaseProviders),
    { provide: ProductRepository, useClass: ProductImplementationRepository },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class DataModule {}
