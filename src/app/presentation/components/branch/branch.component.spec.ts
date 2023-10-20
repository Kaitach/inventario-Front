import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BranchComponent } from './branch.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { BranchRepository } from 'src/app/domain';
import { IBranchRegisterModel } from 'src/app/domain/models/branchRegisterModel';

describe('BranchComponent', () => {
  let component: BranchComponent;
  let fixture: ComponentFixture<BranchComponent>;
  let branchRepository: BranchRepository;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchComponent],
      providers: [
        FormBuilder,
        {
          provide: BranchRepository,
          useValue: {
            createBranch: jasmine.createSpy('createBranch').and.returnValue(of({})),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(BranchComponent);
    component = fixture.componentInstance;
    branchRepository = TestBed.inject(BranchRepository);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form', () => {
    component.branchForm.setValue({
      name: 'Branch Name',
      city: 'Branch City',
      country: 'Branch Country',
    });

    component.onSubmit();

    expect(branchRepository.createBranch).toHaveBeenCalledWith(jasmine.any(Object));

  });

  it('should show an alert', () => {
    component.showAutoCloseAlert('Test Message', 1000, true);
    expect(component.showAlert).toBe(true);

    setTimeout(() => {
      expect(component.showAlert).toBe(false);
    }, 1000);
  });

});
