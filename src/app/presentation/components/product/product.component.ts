import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BranchUseCaseProviders } from 'src/app/data/factory/branchFactory';
import { producthUseCaseProviders } from 'src/app/data/factory/productFactory';
import { IproductEntity } from 'src/app/data/repository';
import { AuthService } from 'src/app/data/repository/auth/auth.service';
import { BranchRepository, IBranchModel, ProductRepository, productModel } from 'src/app/domain';
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
    private readonly authService: AuthService
  ) {
    this.productForm = this.formBuilder.group({
      productId: [''],
      quantity: ['']
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      branchId: ['', Validators.required]
    });
  }

  productForm: FormGroup;
  registerForm: FormGroup;
  factory = producthUseCaseProviders;
  factoryBranch = BranchUseCaseProviders;
  Modal = true;
  products: IproductEntity[] = [];
  endpoint = '';
  productNames: string[] = [];
  branchsNames: string[] = [];
  branchsList: IBranchModel[] = [];

  ngOnInit(): void {
    this.loadProducts();
    this.loadBranch();
  }

  onSubmit(): void {
    this.sendToEndpoint(this.endpoint);
    this.Modal = !this.Modal;
  }

  loadProducts(): void {
    this.factory.getAllProduct.useFactory(this.productRepository).execute().subscribe(
      (data) => {
        this.products = data;
        this.productNames = this.products.map((product) => product.name);
      },
      (error) => {
        console.error('Error al obtener la lista de productos:', error);
      }
    );
  }

  loadBranch(): void {
    this.factoryBranch.getallBranch.useFactory(this.branchRepository).execute().subscribe(
      (data) => {
        this.branchsList = data;
        console.log(this.productNames);
      },
      (error) => {
        console.error('Error al obtener la lista de productos:', error);
      }
    );
  }
  get selectedRole(): string {
    return this.authService.getSelectedRole();
  }

  sendToEndpoint(data: string): void {
    if (this.registerForm.valid) {
      const registerFormData = this.registerForm.value as IProductRegisterModel;
      this.factory.Createproduct.useFactory(this.productRepository).execute(registerFormData).subscribe();
    }
    if (this.productForm.valid) {
      const idAndQuantity = this.productForm.value as productInventoryModel;
      this.factory.registerQuantity.useFactory(this.productRepository).execute(idAndQuantity, data).subscribe();
    }
  }

  toggleModal(data: string) {
    this.endpoint = data;
    this.Modal = false;
  }
}
