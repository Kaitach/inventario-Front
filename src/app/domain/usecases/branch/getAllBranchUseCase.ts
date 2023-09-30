import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { BranchRepository, IBranchModel } from '../..';


export class getAllBranchUseCase  {
  constructor(private BranchRepository: BranchRepository) {}

  execute(): Observable<IBranchModel[]> {


    return this.BranchRepository.getAllBranch();
  }
}
