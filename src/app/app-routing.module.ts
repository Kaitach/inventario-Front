import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { BranchComponent } from './branch/branch.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'product', component: ProductComponent },
  { path: 'branch', component: BranchComponent },
  { path: '', redirectTo: '/user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
