import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  BranchComponent,
  ProductComponent,
  UserComponent,
} from '@presentation/components';
import { NotifierModule } from 'angular-notifier';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataModule } from './data';

const config: SocketIoConfig = { url: environment.HOST_81, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    BranchComponent,
    ProductComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DataModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    NotifierModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
