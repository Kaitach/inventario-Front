import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IBranchRegisterModel } from 'src/app/domain/models/branchRegisterModel';
import { BranchImplementationRepository } from '../branch.implemntation.repositoy';

describe('BranchImplementationRepository', () => {
  let service: BranchImplementationRepository;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BranchImplementationRepository],
    });

    service = TestBed.inject(BranchImplementationRepository);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a branch', () => {
    const dummyBranch: IBranchRegisterModel = {
      name: 'Sucursal de ejemplo',
      location: {
        city: '',
        country: '',
      },
    };

    service.createBranch(dummyBranch).subscribe((branch: any) => {
      expect(branch).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/api/v1/branch/register`
    );
    expect(req.request.method).toEqual('POST');
    req.flush({});

    httpTestingController.verify();
  });

  it('should get all branches', () => {
    service.getAllBranch().subscribe((branches: any) => {
      expect(branches).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `http://localhost:4000/api/v1/branch`
    );
    expect(req.request.method).toEqual('GET');
    req.flush([]);

    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
