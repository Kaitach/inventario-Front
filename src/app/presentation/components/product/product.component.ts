import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBranchModel, IProductModel } from '@domain/models';
import { BranchRepository, ProductRepository } from '@domain/repository';
import { NotifierService } from 'angular-notifier';
import { BranchUseCaseProviders, productUseCaseProviders } from 'data/factory';
import { IProductEntity, SocketService } from 'data/repository';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  branchesList: IBranchModel[] = [];
  constructor(
    private readonly productRepository: ProductRepository<IProductModel>,
    private readonly branchRepository: BranchRepository,
    private formBuilder: FormBuilder,
    private socketService: SocketService,
    private readonly notifier: NotifierService
  ) {
    this.notifier = notifier;
    this.productForm = this.formBuilder.group({
      productId: [''],
      quantity: 0,
    });

    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      price: [0, [Validators.required]],
      category: ['', Validators.required],
      branchId: ['', Validators.required],
      quantity: [0, [Validators.required]],
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
    this.branchRepository.getAllBranch().subscribe((data) => {
      this.branchesList = data;
    });
  }

  onSubmit(): void {
    this.sendToEndpoint();
    // this.Modal = !this.Modal;
    // this.registerForm.reset();
  }

  sendToEndpoint(): void {
    console.log('sendToEndpoint');
    if (this.registerForm.valid) {
      console.log({
        name: this.registerForm.get('name')?.value,
        description: this.registerForm.get('description')?.value,
        price: this.registerForm.get('price')?.value,
        quantity: this.registerForm.get('quantity')?.value,
        category: this.registerForm.get('category')?.value,
        branchId: this.registerForm.get('branchId')?.value,
      });
      this.factory.createProduct
        .useFactory(this.productRepository)
        .execute({
          name: this.registerForm.get('name')?.value,
          description: this.registerForm.get('description')?.value,
          price: this.registerForm.get('price')?.value,
          quantity: this.registerForm.get('quantity')?.value,
          category: this.registerForm.get('category')?.value,
          branchId: this.registerForm.get('branchId')?.value,
        })
        .subscribe({
          complete: () => {
            this.notifier.notify('success', 'Producto registrado con éxito');
          },
          error: (error) => {
            console.log(error);
            this.notifier.notify(
              'error',
              error.error.message ? error.error.message : error
            );
          },
        });
    } else {
      console.log('sendToEndpoint invalid');
      const controlName = this.registerForm.get('name');
      const controlQuantity = this.registerForm.get('quantity');
      const controlBranchId = this.registerForm.get('branchId');
      const controlPrice = this.registerForm.get('price');
      const controlDescription = this.registerForm.get('description');
      const controlCategory = this.registerForm.get('category');
      console.log(controlName?.invalid);
      console.log(controlQuantity?.invalid);
      console.log(controlBranchId?.invalid);
      console.log(controlPrice?.invalid);
      console.log(controlDescription?.invalid);
      console.log(controlCategory?.invalid);
    }
  }

  toggleModal(data: string) {
    this.endpoint = data;
    this.Modal = false;
  }
}
