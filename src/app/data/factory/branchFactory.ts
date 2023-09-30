import { BranchRepository } from "src/app/domain";
import { getAllBranchUseCase } from "src/app/domain/usecases/branch/getAllBranchUseCase";
import { CreateBranchUseCase } from "src/app/domain/usecases/branch/registerBranchUseCase";


export const createBranchUseCaseFactory = (BranchRepository: BranchRepository) =>
  new CreateBranchUseCase(BranchRepository);



  export  const getAllBranchUsecaseFactory =
  (
    BranchRepository: BranchRepository
  
  )=> new getAllBranchUseCase(BranchRepository);
   

  export const BranchUseCaseProviders = {
      
    createBranch: {
      provide: CreateBranchUseCase,
      useFactory: createBranchUseCaseFactory,
      deps: [BranchRepository],
    },
    getallBranch: {
      provide: getAllBranchUseCase,
      useFactory: getAllBranchUsecaseFactory,
      deps: [BranchRepository],
    },
  
  };
  
  
