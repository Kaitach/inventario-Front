import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchUseCaseProviders } from 'src/app/data/factory/branchFactory';
import { AuthService } from 'src/app/data/repository/auth/auth.service';
import { BranchRepository, IBranchModel } from 'src/app/domain';
import { UserRepository, } from 'src/app/domain';
import { IUserLogin } from 'src/app/domain/models/userLogin';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']

})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  branchsList: IBranchModel[] = [];
  selectedBranchProducts: any[] = [];
  selectedBranchUsers: any[] = [];
  selectedBranchSales: any[] = [];
  factoryBranch = BranchUseCaseProviders;
  showAlert: boolean = false;
  alertMessage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userRepository: UserRepository,
    private  branchRepository: BranchRepository,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBranch();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
 
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      const user: IUserLogin = {
        email: email,
        password: password,
      };

      this.userRepository.login(user).subscribe(
        (data) => {
      
          this.authService.setToken(data.access_token);
          const  token =   this.authService.getToken() as string
          this.authService.login(token)
          this.onBranchChange()
          this.showAutoCloseAlert(`Loggueado correctamente  ${email}`, 1500);

          this.router.navigate(['/product'])},
        
        (error) => {
          this.showAutoCloseAlert('El correo y la contraseña no coinciden.', 1500, true);
        }
      );
    }
  }

  loadBranch(): void {
    this.factoryBranch.getallBranch
      .useFactory(this.branchRepository)
      .execute()
      .subscribe(
        (data) => {
          this.branchsList = data;
          this.authService.setSelectedBranchList(this.branchsList) 
        },
        (error) => {
          console.error('Error al obtener la lista de productos:', error);
        }
      );
  }

  onBranchChange(): void {
    const branchId = this.authService.getSelectedBranchId();
    
    const selectedBranch = this.branchsList.find(
      (branch) => branch.branchId === branchId
    );
  
    if (selectedBranch) {
      this.selectedBranchProducts = selectedBranch.products;
      this.selectedBranchUsers = selectedBranch.users;
      this.selectedBranchSales = selectedBranch.sales;
  
      this.authService.setBranchInfo(branchId, this.selectedBranchProducts, this.selectedBranchSales, this.selectedBranchUsers);
    }
  }


  showAutoCloseAlert(message: string, duration: number, isError = false ): void {
    this.alertMessage = message;
    this.showAlert = true;
    const alertClass = isError ? 'alert-danger' : 'alert-success';

    setTimeout(() => {
      this.showAlert = false;
      this.alertMessage = '';
    }, duration);
  }

}
