import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from 'src/app/data/repository/auth/auth.service';
import { UserRepository } from 'src/app/domain';
import { IUserLogin } from 'src/app/domain/models/userLogin';
import { BranchRepository, IBranchModel } from 'src/app/domain';
import { Router } from '@angular/router';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;
  let userRepository: UserRepository;
  let branchRepository: BranchRepository;
  let router: Router;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: AuthService,
          useValue: {
            setToken: jasmine.createSpy('setToken'),
            getToken: jasmine.createSpy('getToken').and.returnValue('test_token'),
            login: jasmine.createSpy('login'),
            setSelectedBranchList: jasmine.createSpy('setSelectedBranchList'),
            setSelectedBranchId: jasmine.createSpy('setSelectedBranchId'),
            setBranchInfo: jasmine.createSpy('setBranchInfo'),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            login: jasmine.createSpy('login').and.returnValue(of({ access_token: 'test_token' })),
          },
        },
        {
          provide: BranchRepository,
          useValue: {
            getAllBranch: jasmine.createSpy('getAllBranch').and.returnValue(of([])),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    userRepository = TestBed.inject(UserRepository);
    branchRepository = TestBed.inject(BranchRepository);
    router = TestBed.inject(Router);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the login form', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'test_password',
    });

    component.onSubmit();

    expect(userRepository.login).toHaveBeenCalledWith(jasmine.any(Object));

    expect(authService.setToken).toHaveBeenCalledWith('test_token');
    expect(authService.getToken).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalledWith('test_token');
    
    expect(component.showAlert).toBe(true);
  });

  it('should load branch data', () => {
    component.loadBranch();

    expect(branchRepository.getAllBranch).toHaveBeenCalled();

    expect(authService.setSelectedBranchList).toHaveBeenCalledWith(jasmine.any(Array));
  });



  it('should show an alert', () => {
    component.showAutoCloseAlert('Test Message', 1000, true);
    expect(component.showAlert).toBe(true);

    setTimeout(() => {
      expect(component.showAlert).toBe(false);
    }, 1000);
  });

});
