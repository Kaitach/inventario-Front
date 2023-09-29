import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent  implements OnInit {
  formData: any = {
    id: '',
    quantity: 0,
  };

  productData: any = {
    name: '',
    description: '',
    price: 0,
    category: '',
    branchId: '',
  };

  Modal = true;
  products: any[] = [];
  endpoint = '';
  productNames: string[] = [];
  branchsNames: string[] = [];
  branchsList: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadProducts();
    this.loadBranch()
  }
  onSubmit(): void {
    this.sendToEndpoint(this.endpoint);
    this.Modal = !this.Modal;

  }
  loadProducts(): void {
    const apiUrl = 'http://localhost:3000/api/v1/product/';
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.products = data;

        this.productNames = this.products.map((product) => product.name);
        console.log(this.productNames)

      },
      (error) => {
        console.error('Error al obtener la lista de productos:', error);
      }
    );
  }
  loadBranch(): void {
    const apiUrl = 'http://localhost:3000/api/v1/branch/';
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.branchsList = data;
        console.log(this.branchsList);
        this.branchsNames = this.branchsList.map((branch) => branch.name);

      },
      (error) => {
        console.error('Error al obtener la lista de productos:', error);
      }
    );
  }
  sendToEndpoint(data:string): void {
    const apiUrl = `http://localhost:3000/api/v1/product/${data}/${this.formData.id}`;
    if (data === 'register') {
      console.log(data);

      this.http.post(apiUrl, this.productData).subscribe(
        (response) => {
          console.log('Datos enviados con éxito a', apiUrl, response);
        },
        (error) => {
          console.error('Error al enviar datos a', apiUrl, error);
        }
      );
      this.loadProducts()
    }
    else{
    this.http.post(apiUrl, this.formData).subscribe(
      (response) => {
        console.log('Datos enviados con éxito a', apiUrl, response);
      },
      (error) => {
        console.error('Error al enviar datos a', apiUrl, error);
      }
    );
  }
  }
  toggleModal(data: string) {
    this.endpoint = data;
    this.Modal = false;
  }
}
