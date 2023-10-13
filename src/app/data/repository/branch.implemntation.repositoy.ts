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
  backendApiUri = window._env.BACKEND_API_URI;
  backendApiUriPersistence = window._env.PERSISTENCE_API_URI;

  apiUrl = `${this.backendApiUri}/api/v1/branch/`;
  apiUrlGEt = `${this.backendApiUriPersistence}/api/v1/branch/`;
 
  BranchMapper = new BranchImplementationRepositoryMapper();
  constructor(private http: HttpClient) {
    super();
  }

  createBranch(Branch: IBranchRegisterModel): Observable<IBranchModel> {
    console.log('URL para createBranch:', this.apiUrl); // Agrega este console.log
    return this.http.post<IBranchModel>(`http://${this.apiUrl}register`, Branch)  ;
  }

  getAllBranch(): Observable<IBranchModel[]> {
    console.log('URL para getAllBranch:', this.apiUrlGEt); // Agrega este console.log
    return this.http.get<IBranchModel[]>(`http://${this.apiUrlGEt}`);
  }
}
