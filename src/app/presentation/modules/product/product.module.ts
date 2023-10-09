import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  GetAllProductsComponent,
  RegisterProductComponent,
} from './components';
import { IndividualComponent } from './components/individual/individual.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    IndividualComponent,
    ProductComponent,
    GetAllProductsComponent,
    RegisterProductComponent,
  ],
  imports: [
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
  ],
})
export class ProductModule {}
