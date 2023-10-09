import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from '@presentation/shared';
import { SharedModule } from '@presentation/shared/shared.module';
import { NotifierModule } from 'angular-notifier';
import { DataModule } from 'data/data.module';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments';
import { BranchModule } from '../branch';
import { ProductModule } from '../product';
import { SaleModule } from '../sale';
import { UserModule } from '../user';
import { LandingComponent } from './components';
import { HomeRoutingModule } from './home-routing.module';
import { AppComponent } from './pages';

const config: SocketIoConfig = { url: environment.HOST_81, options: {} };

@NgModule({
  declarations: [LandingComponent, SidebarComponent, AppComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule,
    SharedModule,
    ProductModule,
    BranchModule,
    DataModule,
    UserModule,
    SaleModule,
    SocketIoModule.forRoot(config),
    HomeRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class HomeModule {}
