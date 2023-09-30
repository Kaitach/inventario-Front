import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBranchModel } from '../models';
import { IBranchRegisterModel } from '../models/branchRegisterModel';



export abstract class BranchRepository {
  abstract createBranch(Branch: IBranchRegisterModel): Observable<IBranchModel>;
  abstract getAllBranch(): Observable<IBranchModel[]>;

}
