import { BranchRepository, IBranchModel, UserRepository } from 'src/app/domain';
import { Component, OnInit } from '@angular/core';
import { userUseCaseProviders } from 'src/app/data/factory/userfactory';
import { BranchUseCaseProviders } from 'src/app/data/factory/branchFactory';
import { IuserRegister } from 'src/app/domain/models/userRegister';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/data/repository/auth/auth.service';
import { SocketService } from 'src/app/data/repository/webSoket/socketService';
import { UserEntity } from 'src/app/data/repository';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(    private socketService: SocketService,
    private readonly userRepository: UserRepository , private readonly branchRepository: BranchRepository,public  authService: AuthService , private formBuilder: FormBuilder) { }
  
 
  factoryBranch = BranchUseCaseProviders

  users: any[] = []; 
  roles!: string[] ;
  selectedRole: string = '';
  factory = userUseCaseProviders
  branchsList: IBranchModel[] = [];
  userDataForm!: FormGroup;
  selectedBranchId!: string;


  ngOnInit(): void {
    this.selectedBranchId = this.authService.getSelectedBranchId();
    this.users = this.authService.getSelectedBranchUsers()
    this.selectedRole = this.authService.getSelectedRole();
    this.setRoles()
    console.log(this.users)
    this.userDataForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      branchId: [this.selectedBranchId, Validators.required],
      role: ['', Validators.required],
    });

    this.socketService.listenToEvent(`new.User_${this.selectedBranchId}`).subscribe((data) => {
       const user = JSON.parse(data) as UserEntity;

      this.users.push(user);

    });
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
        branchId: this.selectedBranchId
      };
      console.log(this.userDataForm)

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