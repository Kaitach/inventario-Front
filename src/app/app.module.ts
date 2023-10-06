import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  AuthComponent,
  BranchComponent,
  ProductComponent,
  UserComponent,
} from '@presentation/components';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataModule, SocketService } from './data';

const config: SocketIoConfig = { url: 'http://localhost:81', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    BranchComponent,
    ProductComponent,
    UserComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DataModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
