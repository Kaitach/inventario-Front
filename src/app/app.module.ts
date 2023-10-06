import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataModule } from './data/data.module';
import { BranchComponent } from './presentation/components/branch/branch.component';
import { ProductComponent } from './presentation/components/product/product.component';
import { UserComponent } from './presentation/components/user/user.component';
import { AuthComponent } from './presentation/components/auth/auth.component';
import { SocketService } from './data/repository/webSoket/socketService';
import { NgxPaginationModule } from 'ngx-pagination';
import { SaleComponent } from './presentation/components/sale/sale.component';

@NgModule({
  declarations: [
    AppComponent,
    BranchComponent,
    ProductComponent,
    UserComponent,
    AuthComponent,
    SaleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DataModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
