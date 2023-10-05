import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBranchRegisterModel } from '@domain/models';
import { BranchRepository } from '@domain/repository';
import { BranchUseCaseProviders } from 'data/factory';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent implements OnInit {
  constructor(
    private readonly branchRepository: BranchRepository,
    private formBuilder: FormBuilder
  ) {
    this.branchForm = this.formBuilder.group({
      name: ['', Validators.required],

      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.branchRepository.getAllBranch().subscribe((data) => {
      console.log('Lista de sucursales:', data);
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
}
