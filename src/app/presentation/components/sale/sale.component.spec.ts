import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaleComponent } from './sale.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/data/repository/auth/auth.service';
import { ProductRepository, productModel } from 'src/app/domain';
import { SocketService } from 'src/app/data/repository/webSoket/socketService';
import { SaleEntity } from 'src/app/data/repository/entities/sale.entity';
import { of } from 'rxjs';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { IproductEntity } from 'src/app/data/repository';

describe('SaleComponent', () => {
  let component: SaleComponent;
  let fixture: ComponentFixture<SaleComponent>;
  let authService: AuthService;
  let productRepository: ProductRepository<productModel>;
  let socketService: SocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: AuthService,
          useValue: {
            getSelectedBranchProducts: () => [],
            getSelectedBranchId: () => 'test_branch_id',
            setSelectedBranchId: jasmine.createSpy('setSelectedBranchId'),
            setBranchInfo: jasmine.createSpy('setBranchInfo'),
          },
        },
        {
          provide: ProductRepository,
          useValue: {
            returnSale: jasmine.createSpy('returnSale').and.returnValue(of({})),
          },
        },
        {
          provide: SocketService,
          useValue: {
            listenToEvent: jasmine.createSpy('listenToEvent').and.returnValue(of({})),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(SaleComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    productRepository = TestBed.inject(ProductRepository);
    socketService = TestBed.inject(SocketService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle returning sales', () => {
    component.saveSaleChanges();

    expect(authService.setBranchInfo).toHaveBeenCalled();
    expect(productRepository.returnSale).toHaveBeenCalled();
  });



});
