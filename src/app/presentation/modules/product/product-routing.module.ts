import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../branch';
import {
  GetAllProductsComponent,
  IndividualProductComponent,
} from './components';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'all',
        component: GetAllProductsComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: ':id',
        component: IndividualProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
