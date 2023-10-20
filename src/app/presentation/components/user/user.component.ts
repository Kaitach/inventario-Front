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
    private readonly userRepository: UserRepository , private readonly branchRepository: BranchRepository,public  authService: AuthService , private formBuilder: FormBuilder) { 
      this.branchsList =   authService.getSelectedBranchList()
    }
  
 
  factoryBranch = BranchUseCaseProviders
  showAlert: boolean = false;
  alertMessage: string = '';

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
       const existingUser  = this.users.find(user => user.id === user.id );
       console.log("llega el evento")

        this.users.push(user);
      
     
      });


 
      this.socketService.listenToEvent(`branchRegister`).subscribe((data) => {
        const nerBranch = JSON.parse(data) as IBranchModel;
       
        console.log("llega el evento")
      
          this.branchsList.push(nerBranch);
        })

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
      if(this.selectedRole !=  'SuperAdmin')
      formData.branchId = this.selectedBranchId
      this.factory.createUser.useFactory(this.userRepository).execute(formData).subscribe(
        (response) => {
          this.showAutoCloseAlert('Solicitud enviada con exito', 1000)
       },
        (error) => {
          this.showAutoCloseAlert('Error al crear usuario', 1000, true)
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