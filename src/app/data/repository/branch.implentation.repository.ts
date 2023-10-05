import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBranchModel, IBranchRegisterModel } from '@domain/models';
import { BranchRepository } from '@domain/repository';
import { Observable } from 'rxjs';
import { BranchImplementationRepositoryMapper } from './mappers';

@Injectable({
  providedIn: 'root',
})
export class BranchImplementationRepository extends BranchRepository {
  BranchMapper = new BranchImplementationRepositoryMapper();
  constructor(private http: HttpClient) {
    super();
  }

  createBranch(Branch: IBranchRegisterModel): Observable<IBranchModel> {
    return this.http.post<IBranchModel>(
      'http://localhost:3000/api/v1/branch/register',
      Branch
    );
  }

  getAllBranch(): Observable<IBranchModel[]> {
    return this.http.get<IBranchModel[]>(
      'http://localhost:3001/api/v1/branches/'
    );
  }
}
