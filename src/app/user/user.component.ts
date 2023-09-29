import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  roles: string[] = ['superAdmin', 'Admin', 'Seller'];
  selectedRole: string = '';

  userData: any = {
  name:{
    firstName: '',
    lastName: '',

  },
    email: '',
    password: '',
    role: '',
    branchId:''
  };
  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  onSubmit(): void {
    this.userData.role = this.selectedRole;
    this.http.post('http://localhost:3000/api/v1/user/register', this.userData)
      .subscribe(response => {
        console.log('Usuario registrado con éxito', response);
      }, error => {
        console.error('Error al registrar el usuario', error);
      });
  }
}
