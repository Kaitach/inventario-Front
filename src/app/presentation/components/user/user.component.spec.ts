import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/data/repository/auth/auth.service';
import { SocketService } from 'src/app/data/repository/webSoket/socketService';
import { of } from 'rxjs';
import { UserRepository, UserModel, BranchRepository } from 'src/app/domain';
import { IuserRegister } from 'src/app/domain/models/userRegister';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let authService: AuthService;
  let userRepository: UserRepository;
  let socketService: SocketService;
  let branchRepository: BranchRepository;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: AuthService,
          useValue: {
            getSelectedBranchList: () => [], 
            getSelectedBranchId: () => 'test_branch_id',
            setSelectedBranchId: jasmine.createSpy('setSelectedBranchId'),
            setBranchInfo: jasmine.createSpy('setBranchInfo'),
            getSelectedBranchUsers: () => [], 
            getSelectedRole: () => 'SuperAdmin',
          },
        },
        {
          provide: UserRepository,
          useValue: {
            createUser: jasmine.createSpy('createUser').and.returnValue(of({})),
          },
        },
        {
          provide: BranchRepository,
          useValue: {
            // Agrega aquí cualquier método que necesites para las pruebas
          },
        },
        {
          provide: SocketService,
          useValue: {
            // Agrega aquí cualquier método que necesites para las pruebas
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    userRepository = TestBed.inject(UserRepository);
    socketService = TestBed.inject(SocketService);
    branchRepository = TestBed.inject(BranchRepository);
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set roles based on selected role', () => {
    component.selectedRole = 'SuperAdmin';
    component.setRoles();
    expect(component.roles).toEqual(['SuperAdmin', 'Admin', 'Seller']);

    component.selectedRole = 'Admin';
    component.setRoles();
    expect(component.roles).toEqual(['Admin', 'Seller']);
  });

  it('should show auto-close alert', (done: DoneFn) => {
    component.showAutoCloseAlert('Success Message', 1000, false);
    expect(component.showAlert).toBeTruthy();
    expect(component.alertMessage).toBe('Success Message');

    setTimeout(() => {
      expect(component.showAlert).toBeFalsy();
      expect(component.alertMessage).toBe('');
      done();
    }, 1000);
  });


});
