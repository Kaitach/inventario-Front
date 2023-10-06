import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IBranchModel,
  IBranchRegisterModel,
  IProductModel,
} from '@domain/models';
import { BranchRepository, ProductRepository } from '@domain/repository';
import { BranchUseCaseProviders } from 'data/factory';
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent implements OnInit {
  branchesList: IBranchModel[] = [];
  selectedBranchId: string = '';
  _products: BehaviorSubject<IProductModel[]> = new BehaviorSubject<
    IProductModel[]
  >([]);
  products = this._products.asObservable();
  constructor(
    private readonly socket: Socket,
    private readonly branchRepository: BranchRepository,
    private readonly productRepository: ProductRepository<IProductModel>,
    private formBuilder: FormBuilder
  ) {
    socket.on('product.change', (data: IProductModel) => {
      console.log(data);
      this._products.next([...this._products.getValue(), data]);
    });
    this.branchForm = this.formBuilder.group({
      name: ['', Validators.required],

      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.branchRepository.getAllBranch().subscribe((data) => {
      this.branchesList = data;
    });
  }
  branchForm: FormGroup;
  branchData: IBranchRegisterModel = {
    name: '',
    location: {
      city: '',
      country: '',
    },
  };

  factory = BranchUseCaseProviders;

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
        .subscribe();
    }
  }

  onBranchChange(): void {
    this.productRepository
      .getAllProduct(this.selectedBranchId)
      .subscribe((data) => {
        this._products.next(data);
      });
    console.log(this.selectedBranchId);
  }
}
