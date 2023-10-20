import { Observable } from 'rxjs';
import { BranchRepository, IBranchModel } from '../..';
import { getAllBranchUseCase } from '../branch/getAllBranchUseCase';

describe('getAllBranchUseCase', () => {
    let branchRepository: BranchRepository;
    let useCase: getAllBranchUseCase;

    beforeEach(() => {
        branchRepository = jasmine.createSpyObj('BranchRepository', ['getAllBranch']);
        useCase = new getAllBranchUseCase(branchRepository);
    });

    it('should execute the use case', () => {
        const branchData: IBranchModel[] = [];

        (branchRepository.getAllBranch as jasmine.Spy).and.returnValue(new Observable<IBranchModel[]>(subscriber => {
            subscriber.next(branchData);
            subscriber.complete();
        }));

        const result = useCase.execute();

        expect(branchRepository.getAllBranch).toHaveBeenCalled();
        expect(result instanceof Observable).toBe(true);

        result.subscribe(data => {
            expect(data).toEqual(branchData);
        });
    });
});
