import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBranchModel, IUserRegister } from '@domain/models';
import { BranchRepository, UserRepository } from '@domain/repository';
import { BranchUseCaseProviders, userUseCaseProviders } from 'data/factory';
import { AuthService, SocketService } from 'data/repository';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private socketService: SocketService,
    private readonly userRepository: UserRepository,
    private readonly branchRepository: BranchRepository,
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  factoryBranch = BranchUseCaseProviders;

  roles!: string[];
  selectedRole: string = '';
  factory = userUseCaseProviders;
  branchesList: IBranchModel[] = [];
  userDataForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.loadBranch();
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
    this.factoryBranch.getAllBranch
      .useFactory(this.branchRepository)
      .execute()
      .subscribe(
        (data) => {
          this.branchesList = data;
        },
        (error) => {
          console.error('Error al obtener la lista de productos:', error);
        }
      );
  }
  onSubmit(): void {
    if (this.userDataForm.valid) {
      const formData: IUserRegister = {
        email: this.userDataForm.get('email')?.value,
        password: this.userDataForm.get('password')?.value,
        role: this.userDataForm.get('role')?.value,
        name: {
          firstName: this.userDataForm.get('firstName')?.value,
          lastName: this.userDataForm.get('lastName')?.value,
        },
        branchId: this.userDataForm.get('branchId')?.value,
      };

      this.factory.createUser
        .useFactory(this.userRepository)
        .execute(formData)
        .subscribe(
          (response) => {
            console.log('Usuario creado correctamente');
          },
          (error) => {
            console.error('Error al crear el usuario:', error);
          }
        );
    }
  }
}
