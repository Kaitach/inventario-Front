import { BranchRepository, IBranchModel, UserRepository } from 'src/app/domain';
import { Component, OnInit } from '@angular/core';
import { userUseCaseProviders } from 'src/app/data/factory/userfactory';
import { BranchUseCaseProviders } from 'src/app/data/factory/branchFactory';
import { IuserRegister } from 'src/app/domain/models/userRegister';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/data/repository/auth/auth.service';
import { SocketService } from 'src/app/data/repository/webSoket/socketService';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(    private socketService: SocketService,
    private readonly userRepository: UserRepository , private readonly branchRepository: BranchRepository,public  authService: AuthService , private formBuilder: FormBuilder) { }
  
 
  factoryBranch = BranchUseCaseProviders


  roles!: string[] ;
  selectedRole: string = '';
  factory = userUseCaseProviders
  branchsList: IBranchModel[] = [];
  userDataForm!: FormGroup;


  ngOnInit(): void {
    this.loadBranch()
    this.selectedRole = this.authService.getSelectedRole();
    this.setRoles()
    this.userDataForm = this.formBuilder.group({
      
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      branchId: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.socketService.listenToEvent('branchRegister').subscribe((data) => {
      console.log('Evento recibido:', data);

      this.loadBranch();
    });
  }

  loadBranch(): void {
    this.factoryBranch.getallBranch.useFactory(this.branchRepository).execute().subscribe(   (data) => {
      this.branchsList = data;


    },
    (error) => {
      console.error('Error al obtener la lista de productos:', error);
    }
  );
  }
  onSubmit(): void {
    if (this.userDataForm.valid) {
      const formData: IuserRegister = {
        email: this.userDataForm.get('email')?.value,
        password: this.userDataForm.get('password')?.value,
        role: this.userDataForm.get('role')?.value,
        name: {
          firstName:this.userDataForm.get('firstName')?.value,
          lastName:this.userDataForm.get('lastName')?.value,
        },
        branchId: this.userDataForm.get('branchId')?.value,
      };

      this.factory.createUser.useFactory(this.userRepository).execute(formData).subscribe(
        (response) => {
console.log('Usuario creado correctamente')        },
        (error) => {
          console.error('Error al crear el usuario:', error);
        }
      );
    }

}

setRoles() {
  if (this.selectedRole === 'SuperAdmin') {
    this.roles = ['SuperAdmin', 'Admin', 'Seller'];
  } else {
    this.roles = ['Admin', 'Seller'];
  }
}}