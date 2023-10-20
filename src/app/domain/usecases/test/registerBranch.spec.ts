import { Observable } from 'rxjs';
import { BranchRepository, IBranchModel } from '../..';
import { IBranchRegisterModel } from '../../models/branchRegisterModel';
import { CreateBranchUseCase } from '../branch/registerBranchUseCase';

describe('CreateBranchUseCase', () => {
    let branchRepository: BranchRepository;
    let useCase: CreateBranchUseCase;

    beforeEach(() => {
        branchRepository = jasmine.createSpyObj('BranchRepository', ['createBranch']);
        useCase = new CreateBranchUseCase(branchRepository);
    });

    it('should execute the use case', () => {
        const branchData: IBranchRegisterModel = {
            name: 'Branch Name',
            location: {
                city: 'City Name',
                country: 'Country Name'
            }
        };

        (branchRepository.createBranch as jasmine.Spy).and.returnValue(new Observable<IBranchModel>());

        const result = useCase.execute(branchData);

        expect(branchRepository.createBranch).toHaveBeenCalledWith(branchData);
        expect(result instanceof Observable).toBe(true);
    });
});