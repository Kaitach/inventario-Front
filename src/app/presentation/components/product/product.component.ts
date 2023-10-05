import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductModel, IProductRegisterModel } from '@domain/models';
import { BranchRepository, ProductRepository } from '@domain/repository';
import { BranchUseCaseProviders, productUseCaseProviders } from 'data/factory';
import { AuthService, IProductEntity, SocketService } from 'data/repository';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private readonly productRepository: ProductRepository<IProductModel>,
    private readonly branchRepository: BranchRepository,
    private formBuilder: FormBuilder,
    private socketService: SocketService,
    private readonly authService: AuthService
  ) {
    this.productForm = this.formBuilder.group({
      productId: [''],
      quantity: 0,
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
  factory = productUseCaseProviders;
  factoryBranch = BranchUseCaseProviders;
  Modal = true;
  products: IProductEntity[] = [];
  endpoint = '';
  productNames: string[] = [];
  branchesNames: string[] = [];
  branchId!: string;
  ngOnInit(): void {
    this.selectedBranchId = this.authService.getSelectedBranchId();
    this.products = this.authService.getSelectedBranchProducts();
    this.socketService.listenToEvent('productRegister').subscribe((data) => {
      console.log('Evento recibido:', JSON.parse(data));
      const newProduct = JSON.parse(data) as IProductEntity;
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
      this.factory.createProduct
        .useFactory(this.productRepository)
        .execute(registerFormData)
        .subscribe();
    }
    if (this.productForm.valid) {
      const idAndQuantity = this.productForm.get<string>('productId')?.value;
      this.selectedBranchId;

      this.factory.registerQuantity
        .useFactory(this.productRepository)
        .execute(idAndQuantity, {
          quantity: Number(this.productForm.get('quantity')?.value),
        })
        .subscribe();
    }
  }

  toggleModal(data: string) {
    this.endpoint = data;
    this.Modal = false;
  }
}
