import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './presentation/components/branch/branch.component';
import { ProductComponent } from './presentation/components/product/product.component';
import { UserComponent } from './presentation/components/user/user.component';
import { AuthComponent } from './presentation/components/auth/auth.component';
import { AuthGuard } from './presentation/utils/guard/auth.guard';
import { RoleGuard } from './presentation/utils/guard/rolAdmin.guard';
import { RoleSuperGuard } from './presentation/utils/guard/rolSuperAdmin.guard';

const routes: Routes = [
  { path: 'user', component: UserComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'product', component: ProductComponent , canActivate: [AuthGuard]},
  { path: 'branch', component: BranchComponent, canActivate: [AuthGuard,RoleSuperGuard] },
  { path: 'login', component: AuthComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
