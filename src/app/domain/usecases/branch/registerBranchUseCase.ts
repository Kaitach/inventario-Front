import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { BranchRepository, IBranchModel } from '../..';
import { IBranchRegisterModel } from '../../models/branchRegisterModel';


export class CreateBranchUseCase  {
  constructor(private BranchRepository: BranchRepository) {}

  execute(Branch: IBranchRegisterModel): Observable<IBranchModel> {


    return this.BranchRepository.createBranch(Branch);
  }
}
