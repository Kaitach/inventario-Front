import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBranchModel } from '@domain/models';
import { BranchRepository } from '@domain/repository';
import { BranchUseCaseProviders } from 'data/factory';
import { AuthService } from 'data/repository';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  branchesList: IBranchModel[] = [];
  factoryBranch = BranchUseCaseProviders;
  selectedBranchId: string = '';
  selectedBranchProducts: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private readonly branchRepository: BranchRepository,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBranch();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    console.log(
      '%cUsuarios predeterminados: SuperAdmin-SuperAdmin   admin-admin   seller-seller',
      'color: white; background-color: #007BFF; padding: 5px; border-radius: 5px; font-weight: bold;'
    );
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      if (this.authService.login(email, password)) {
        this.authService.setSelectedBranchId(this.selectedBranchId);
        this.authService.setSelectedBranchProducts(this.selectedBranchProducts);
      }
    }
  }

  loadBranch(): void {
    this.factoryBranch.getAllBranch
      .useFactory(this.branchRepository)
      .execute()
      .subscribe(
        (data) => {
          this.branchesList = data;
          this.onBranchChange();
        },
        (error) => {
          console.error('Error al obtener la lista de productos:', error);
        }
      );
  }

  onBranchChange(): void {
    const selectedBranch = this.branchesList.find(
      (branch) => branch.id === this.selectedBranchId
    );

    if (selectedBranch) {
      this.selectedBranchProducts = selectedBranch.products;
    }
  }
}
