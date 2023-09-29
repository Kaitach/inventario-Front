import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent {
  branchData: any = {
    name: '',
    location: {
      city: '',
      country: ''
    }
  };

  constructor(private http: HttpClient) { }

  onSubmit(): void {
    this.http.post('http://localhost:3000/api/v1/branch/register', this.branchData)
      .subscribe(response => {
        console.log('Sucursal registrada con éxito', response);
      }, error => {
        console.error('Error al registrar la sucursal', error);
      });
  }
}
