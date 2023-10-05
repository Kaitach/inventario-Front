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
  ngOnInit(): void {
    this.selectedBranchId = this.authService.getSelectedBranchId();
    this.products = this.authService.getSelectedBranchProducts();
    this.socketService.listenToEvent('productRegister').subscribe((data) => {
      console.log('Evento recibido:', JSON.parse(data));
      const newProduct = JSON.parse(data) as IproductEntity;
      const existingProductIndex = this.products.findIndex(
        (product) => product.productId === newProduct.productId
      );
    
      if (existingProductIndex !== -1) {
        // Si ya existe un producto con el mismo ID, actualiza su valor de quantity
        this.products[existingProductIndex].quantity = newProduct.quantity;
      } else if (newProduct.branchId === this.selectedBranchId) {
        // Si no existe un producto con el mismo ID y pertenece a la sucursal seleccionada, agrégalo
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

  toggleModal(data: string) {
    this.endpoint = data;
    this.Modal = false;
  }
}
