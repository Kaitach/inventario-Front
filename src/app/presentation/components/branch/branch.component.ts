import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IBranchModel,
  IBranchRegisterModel,
  IProductModel,
} from '@domain/models';
import { BranchRepository, ProductRepository } from '@domain/repository';
import { SaleRepository } from '@domain/repository/sales.repository';
import { InventorySocket } from '@presentation/services/inventory.service';
import { NotifierService } from 'angular-notifier';
import { BranchUseCaseProviders, SaleUseCaseProviders } from 'data/factory';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent implements OnInit {
  branchesList: IBranchModel[] = [];
  selectedBranchId: string = '';
  products = this.socket.products;
  productsSale: {
    id: string;
    name: string;
    quantity: number;
  }[] = [];

  numbers: number[] = [];
  numbersStock: number[] = [];

  constructor(
    private readonly socket: InventorySocket,
    private readonly branchRepository: BranchRepository,
    private readonly saleRepository: SaleRepository,
    private readonly productRepository: ProductRepository<IProductModel>,
    private formBuilder: FormBuilder,
    private readonly notifier: NotifierService
  ) {
    this.notifier = notifier;
    this.branchForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],

      city: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      country: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.branchRepository.getAllBranch().subscribe((data) => {
      this.branchesList = data;
    });
    this.products.subscribe((data) => {
      if (data.length > this.numbers.length) {
        const number = data.length - this.numbers.length;
        const auxNumbers: number[] = new Array(number).fill(0);
        this.numbers = [...this.numbers, ...auxNumbers];
        this.numbersStock = [...this.numbersStock, ...auxNumbers];
      }
    });
  }
  branchForm: FormGroup;

  factory = BranchUseCaseProviders;
  factorySale = SaleUseCaseProviders;

  increment(index: number): void {
    this.numbers[index] = this.numbers[index] + 1;
  }

  decrement(index: number): void {
    if (this.numbers[index] > 0) this.numbers[index] = this.numbers[index] - 1;
    else this.numbers[index] = 0;
  }

  validarNumero(id: string): boolean {
    const product = this.productsSale.find((x) => x.id === id);
    if (product) {
      if (product.quantity <= 0) {
        return true;
      }
    }
    return false;
  }

  getNumber(id: string): number {
    const product = this.productsSale.find((x) => x.id === id);
    return product?.quantity ? product.quantity : 0;
  }

  onSubmit(): void {
    if (this.branchForm.valid) {
      const formData: IBranchRegisterModel = {
        name: this.branchForm.get('name')?.value,
        location: {
          city: this.branchForm.get('city')?.value,
          country: this.branchForm.get('country')?.value,
        },
      };
      this.factory.createBranch
        .useFactory(this.branchRepository)
        .execute(formData)
        .subscribe({
          complete: () => {
            this.notifier.notify('success', 'Sucursal creada con éxito');
            this.branchForm.reset();
          },
          error: (error) => {
            this.notifier.notify(
              'error',
              error.error.message ? error.error.message : error
            );
          },
        });
    }
  }

  onBranchChange(): void {
    this.socket.joinInventory(this.selectedBranchId);
    this.productRepository
      .getAllProduct(this.selectedBranchId)
      .subscribe((data) => {
        this.socket.setProducts(data);

        this.socket.orderbyName();
      });
  }

  addToCart(i: string, index: number): void {
    let product = {} as IProductModel;
    this.products.subscribe((data) => {
      product = data[index];
    });
    if (this.numbers[index] <= 0) {
      this.notifier.notify('error', 'La cantidad debe ser mayor a 0');
      return;
    }
    this.productsSale.push({
      id: i,
      name: product?.name ? product.name : '',
      quantity: this.numbers[index],
    });
  }

  deleteItem(id: string): void {
    this.productsSale.splice(
      this.productsSale.findIndex((x) => x.id === id),
      1
    );
  }

  purchase(): void {
    this.factorySale.createSale
      .useFactory(this.saleRepository)
      .execute(
        {
          products: this.productsSale,
          branchId: this.selectedBranchId,
        },
        this.selectedBranchId
      )
      .subscribe({
        complete: () => {
          this.notifier.notify('success', 'Compra realizada con éxito');
          this.productsSale = [];
          this.resetNumbers();
        },
        error: (error) => {
          this.notifier.notify(
            'error',
            error.error.message ? error.error.message : error
          );
        },
      });
  }

  resetNumbers(): void {
    this.numbers = new Array(this.numbers.length).fill(0);
  }

  addStock(id: string, index: number): void {
    if (this.numbersStock[index] <= 0) {
      this.notifier.notify('error', 'La cantidad debe ser mayor a 0');
      return;
    }
    this.productRepository
      .registerQuantity(id, {
        quantity: this.numbersStock[index],
      })
      .subscribe({
        complete: () => {
          this.notifier.notify('success', 'Cantidad agregada con éxito');
        },
        error: (error) => {
          this.notifier.notify(
            'error',
            error.error.message ? error.error.message : error
          );
        },
      });
  }
}
