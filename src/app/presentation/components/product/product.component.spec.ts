import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/data/repository/auth/auth.service';
import { ProductRepository, productModel, BranchRepository } from 'src/app/domain';
import { SocketService } from 'src/app/data/repository/webSoket/socketService';
import { of } from 'rxjs';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productRepository: ProductRepository<productModel>;
  let branchRepository: BranchRepository;
  let authService: AuthService;
  let socketService: SocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        FormBuilder,
        AuthService,
        SocketService,
        {
          provide: ProductRepository,
          useValue: {
            registerQuantity: jasmine.createSpy('registerQuantity').and.returnValue(of({})),
            createProduct: jasmine.createSpy('createProduct').and.returnValue(of({})),
          },
        },
        {
          provide: BranchRepository,
          useValue: {
            getAllBranch: jasmine.createSpy('getAllBranch').and.returnValue(of([])),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productRepository = TestBed.inject(ProductRepository);
    branchRepository = TestBed.inject(BranchRepository);
    authService = TestBed.inject(AuthService);
    socketService = TestBed.inject(SocketService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get the selected role from AuthService', () => {
    spyOn(authService, 'getSelectedRole').and.returnValue('userRole');
    expect(component.selectedRole).toBe('userRole');
  });

  it('should submit the form', () => {
    component.registerForm.setValue({
      name: 'Product Name',
      description: 'Product Description',
      price: 10,
      category: 'Category',
    });

    component.onSubmit();

    expect(productRepository.registerProduct).toHaveBeenCalledWith(jasmine.any(Object));
  });

  it('should send products to the endpoint', () => {
    component.selectedProductsList = [
      {
        name: 'Product 1',
        price: 10,
        productId: '1',
        quantity: 1,
      },
      {
        name: 'Product 2',
        price: 20,
        productId: '2',
        quantity: 2,
      },
    ];

    component.enviarSeleccion();

    expect(productRepository.registerquantity).toHaveBeenCalledWith(jasmine.any(Array), jasmine.any(String));
  });

  it('should show an alert', () => {
    component.showAutoCloseAlert('Test Message', 1000, true);
    expect(component.showAlert).toBe(true);

    setTimeout(() => {
      expect(component.showAlert).toBe(false);
    }, 1000);
  });

});
