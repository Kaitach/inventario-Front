import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthComponent,
  BranchComponent,
  ProductComponent,
  UserComponent,
} from '@presentation/components';
import {
  AuthGuard,
  RoleGuard,
  RoleSuperGuard,
} from '@presentation/utils/guard';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  {
    path: 'branch',
    component: BranchComponent,
    canActivate: [AuthGuard, RoleSuperGuard],
  },
  { path: 'login', component: AuthComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
