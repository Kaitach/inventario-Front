import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BranchRoutingModule } from './branch-routing.module';
import { GetAllBranchesComponent } from './components/get-all/get-all.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [RegisterComponent, GetAllBranchesComponent],
  imports: [CommonModule, BranchRoutingModule],
})
export class BranchModule {}
