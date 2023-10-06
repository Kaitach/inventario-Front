import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent, ProductComponent } from '@presentation/components';
import { UserComponent } from '@presentation/components/user';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
  },
  { path: 'product', component: ProductComponent },
  {
    path: 'branch',
    component: BranchComponent,
  },
  {
    path: '*',
    redirectTo: '/branch',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
