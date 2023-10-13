import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BranchRepository } from 'src/app/domain';
import { BranchUseCaseProviders } from 'src/app/data/factory/branchFactory';
import { IBranchRegisterModel } from 'src/app/domain/models/branchRegisterModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent {
  constructor( private readonly branchRepository: BranchRepository, private formBuilder: FormBuilder) {   
    this.branchForm = this.formBuilder.group({
      name: ['', Validators.required],
      
        city: ['', Validators.required],
        country: ['', Validators.required]
      
    });
  }
  branchForm: FormGroup; 
  branchData: IBranchRegisterModel = {
    name: '',
    location: {
      city: '',
      country: ''
    }
  };
  showAlert: boolean = false;
  alertMessage: string = '';
  factory = BranchUseCaseProviders

  onSubmit(): void {
    if (this.branchForm.valid) {
      const formData: IBranchRegisterModel = {
        name:this.branchForm.get('name')?.value,
        location:{
          city: this.branchForm.get('city')?.value,
          country: this.branchForm.get('country')?.value
        }

        }  
    this.factory.createBranch.useFactory(this.branchRepository).execute(formData).subscribe()}
    this.showAutoCloseAlert('Solicitud enviada con exito', 1000)

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