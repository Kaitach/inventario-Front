import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { GetAllComponent } from './components/get-all/get-all.component';


@NgModule({
  declarations: [
    GetAllComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule
  ]
})
export class SaleModule { }
