import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BranchRepository, IBranchModel } from '../../domain';
import { BranchImplementationRepositoryMapper } from './mappers/branch.mapper';
import { IBranchRegisterModel } from 'src/app/domain/models/branchRegisterModel';

@Injectable({
  providedIn: 'root',
})
export class BranchImplementationRepository extends BranchRepository {
  BranchMapper = new BranchImplementationRepositoryMapper();
  constructor(private http: HttpClient) {
    super();
  }

  createBranch(Branch: IBranchRegisterModel): Observable<IBranchModel> {
    return this.http.post<IBranchModel>('http://localhost:3000/api/v1/branch/register', Branch);
  }

  getAllBranch():Observable<IBranchModel[]>{
    return this.http.get<IBranchModel[]>('http://localhost:3002/api/v1/branch/');

  }
}
