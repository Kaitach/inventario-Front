import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BranchUseCaseProviders } from 'src/app/data/factory/branchFactory';
import { producthUseCaseProviders } from 'src/app/data/factory/productFactory';
import { IproductEntity } from 'src/app/data/repository';
import { AuthService } from 'src/app/data/repository/auth/auth.service';
import { SocketService } from 'src/app/data/repository/webSoket/socketService';
import {
  BranchRepository,
  IBranchModel,
  ProductRepository,
  productModel,
} from 'src/app/domain';
import { productInventoryModel } from 'src/app/domain/models/productInventory.model';
import { IProductRegisterModel } from 'src/app/domain/models/productRegisterModel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private readonly productRepository: ProductRepository<productModel>,
    private readonly branchRepository: BranchRepository,
    private formBuilder: FormBuilder,
    private socketService: SocketService,
    private readonly authService: AuthService
  ) {
    this.productForm = this.formBuilder.group({
      productId: [''],
      quantity: [''],
      branchId: [''],
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      branchId: [''],
    });
  }
  selectedBranchId!: string;
  productForm: FormGroup;
  registerForm: FormGroup;
  factory = producthUseCaseProviders;
  factoryBranch = BranchUseCaseProviders;
  Modal = true;
  products: IproductEntity[] = [];
  endpoint = '';
  productNames: string[] = [];
  branchsNames: string[] = [];
  branchId!: string;
  selectedProduct: any;
  selectedProductsList: any[] = [];
  selectedQuantity: number[] = [];
  showAlert: boolean = false;
  alertMessage: string = '';


  ngOnInit(): void {
    this.selectedBranchId = this.authService.getSelectedBranchId();
    this.products = this.authService.getSelectedBranchProducts();
    console.log(this.products)
    this.socketService.listenToEvent(`productRegister_${this.selectedBranchId}` || 'productReSeller').subscribe((data) => {
      const newProduct = JSON.parse(data) as IproductEntity;
      const existingProductIndex = this.products.findIndex(
        (product) => product.productId === newProduct.productId
      );
    
      if (existingProductIndex !== -1) {
        this.products[existingProductIndex].quantity = newProduct.quantity;
      } else if (newProduct.branchId === this.selectedBranchId) {
        this.products.push(newProduct);
      }
    });
  }

  onSubmit(): void {
    this.sendToEndpoint(this.endpoint);
    this.Modal = !this.Modal;
    this.registerForm.reset();
  }

  get selectedRole(): string {
    return this.authService.getSelectedRole();
  }
  selectProduct(product: any) {
    this.selectedProduct = product;
    this.selectedProductsList.push({
      name: product.name,
      price: product.price,
      productId: product.productId,
      quantity: 1, 
    });
  }
  sendToEndpoint(data: string): void {
    if (this.registerForm.valid) {
      const registerFormData = this.registerForm.value as IProductRegisterModel;
      registerFormData.branchId = this.selectedBranchId;
      this.factory.Createproduct.useFactory(this.productRepository)
        .execute(registerFormData)
        .subscribe();
    }
    if (this.productForm.valid) {
      const idAndQuantity = this.productForm.value as productInventoryModel;
      idAndQuantity.branchId = this.selectedBranchId;

      this.factory.registerQuantity
        .useFactory(this.productRepository)
        .execute(idAndQuantity, data)
        .subscribe();
    }
  }

 
  toggleModal(target: string): void {
    if (target === 'customer-sale') {
      this.endpoint = 'customer-sale';
    } else if (target === 'seller-sale') {
      this.endpoint = 'seller-sale';
    } else if (target === 'purchase') {
      this.endpoint = 'purchase';
    } else if (target === 'register') {
      this.endpoint = 'register';
    }
  }
  enviarSeleccion() {
    if (this.selectedProductsList.length === 0) {
      return; 
    }    


    let factoryToUse: any;

    if (this.endpoint === 'customer-sale') {
      factoryToUse = this.factory.customerSale;
    } else if (this.endpoint === 'seller-sale') {
      factoryToUse = this.factory.sellerSale;
    } else if (this.endpoint === 'purchase') {
      factoryToUse = this.factory.registerQuantity;
    } 


    factoryToUse
      .useFactory(this.productRepository)
      .execute(this.selectedProductsList as unknown as productModel, `${this.selectedBranchId}` )
      .subscribe(
        (response: any) => {
          this.showAutoCloseAlert('Solicitud enviada con exito', 1000)
        },
        (error: any) => {
          console.error('Error al registrar cantidad', error);
        }
      );
      this.selectedProductsList = [];
      this.selectedQuantity = [];
  }



  showAutoCloseAlert(message: string, duration: number): void {
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
      this.alertMessage = '';
    }, duration);
  }
}
