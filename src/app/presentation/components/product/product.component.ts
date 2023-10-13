import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BranchUseCaseProviders } from 'src/app/data/factory/branchFactory';
import { producthUseCaseProviders } from 'src/app/data/factory/productFactory';
import { IproductEntity } from 'src/app/data/repository';
import { AuthService } from 'src/app/data/repository/auth/auth.service';
import { SocketService } from 'src/app/data/repository/webSoket/socketService';
import {
  BranchRepository,
  IBranchModel,
  ProductRepository,
  productModel,
} from 'src/app/domain';
import { productInventoryModel } from 'src/app/domain/models/productInventory.model';
import { IProductRegisterModel } from 'src/app/domain/models/productRegisterModel';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private readonly productRepository: ProductRepository<productModel>,
    private readonly branchRepository: BranchRepository,
    private formBuilder: FormBuilder,
    private socketService: SocketService,
    private readonly authService: AuthService
    
  ) {
    this.productForm = this.formBuilder.group({
      productId: [''],
      quantity: [''],
      branchId: [''],
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      branchId: [''],
    });
  }
  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedBranchId!: string;
  productForm: FormGroup;
  registerForm: FormGroup;
  factory = producthUseCaseProviders;
  factoryBranch = BranchUseCaseProviders;
  Modal = true;
  products: IproductEntity[] = [];
  endpoint = 'purchase';
  productNames: string[] = [];
  branchsNames: string[] = [];
  branchId!: string;
  selectedProduct: any;
  selectedProductsList: any[] = [];
  selectedQuantity: number[] = [];
  showAlert: boolean = false;
  alertMessage: string = '';


  ngOnInit(): void {
    this.selectedBranchId = this.authService.getSelectedBranchId();
    this.products = this.authService.getSelectedBranchProducts();
    this.socketService.listenToEvent(`productRegister_${this.selectedBranchId}` || 'productReSeller').subscribe((data) => {
      const newProduct = JSON.parse(data) as IproductEntity;
      const existingProductIndex = this.products.findIndex(
        
        (product) => product.productId === newProduct.productId
      );
    
      if (existingProductIndex !== -1) {
        this.products[existingProductIndex].quantity = newProduct.quantity;
      } else if (newProduct.branchId === this.selectedBranchId) {
        this.products.push(newProduct);
      }
    });
  }

  onSubmit(): void {
    this.sendToEndpoint();
    this.Modal = !this.Modal;
    this.registerForm.reset();
  }

  get selectedRole(): string {
    return this.authService.getSelectedRole();
  }
  selectProduct(product: any) {
    this.selectedProduct = product;
    this.selectedProductsList.push({
      name: product.name,
      price: product.price,
      productId: product.productId,
      quantity: 1, 
    });
  }
  sendToEndpoint(): void {
    if (this.registerForm.valid) {
      const registerFormData = this.registerForm.value as IProductRegisterModel;
      registerFormData.branchId = this.selectedBranchId;
      this.factory.Createproduct.useFactory(this.productRepository)
        .execute(registerFormData)
        .subscribe();
        this.showAutoCloseAlert('Solicitud enviada con exito', 1000)

    }

  }

 
  toggleModal(target: string): void {
    if (target === 'customer-sale') {
      this.endpoint = 'customer-sale';
    } else if (target === 'seller-sale') {
      this.endpoint = 'seller-sale';
    } else if (target === 'purchase') {
      this.endpoint = 'purchase';
    } else if (target === 'register') {
      this.endpoint = 'register';
    }
  }
  enviarSeleccion() {
    if (this.selectedProductsList.length === 0) {
      return;
    }
  
    let factoryToUse: any;
    
    if (this.endpoint === 'customer-sale' || this.endpoint === 'seller-sale') {
      let canProceed = true;
  
      this.selectedProductsList.forEach((product) => {
        const selectedProduct = this.products.find((p) => p.productId === product.productId);
        if (selectedProduct && product.quantity > selectedProduct.quantity) {
          canProceed = false;
        }
      });
  
      if (!canProceed) {
        this.showAutoCloseAlert('No puedes realizar la acción porque la cantidad seleccionada supera el stock disponible.', 1000, true);
        return;
      }
    }


    if (this.endpoint === 'customer-sale') {
      factoryToUse = this.factory.customerSale;
    } else if (this.endpoint === 'seller-sale') {
      factoryToUse = this.factory.sellerSale;
    } else if (this.endpoint === 'purchase') {
      factoryToUse = this.factory.registerQuantity;
    } 
    console.log(this.selectedProductsList)
    factoryToUse
      .useFactory(this.productRepository)
      .execute(this.selectedProductsList as unknown as productModel, `${this.selectedBranchId}` )
      .subscribe(
        (response: any) => {
          this.showAutoCloseAlert('Solicitud enviada con exito', 1000)
        },
        (error: any) => {
          console.error('Error al registrar cantidad', error);
        }
      );
      this.selectedProductsList = [];
      this.selectedQuantity = [];
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


  onFileChange(event: any): void {
    if (!this.selectedBranchId) return;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = e.target.result;
        console.log(data)
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const jsonData: any = XLSX.utils.sheet_to_json(
          workbook.Sheets[firstSheetName]
        );

        if (!jsonData[0].product || !jsonData[0].quantity) {
          throw new Error('XLSX Format Invalid, require product and quantity');

        }

        const realData = jsonData.map((data: any) => {
          const dbProduct = this.products?.find(
            (product) => product.name === data.product
          );
          return {
            id: dbProduct?.productId,
            quantity: data.quantity,
            name: dbProduct?.name,
            price: dbProduct?.price,
          };
        });

        const newquantitys = realData.map((jsonStock: any) => {
          const newquantity = {
             productId: jsonStock.id,
             quantity: jsonStock.quantity,      
             name:    jsonStock.name,
             price:   jsonStock.price,
           
          };
          console.log(newquantity)
          this.selectedProductsList.push(newquantity)
          return newquantity;
        });
        console.log(newquantitys)
        
       
      
      
      
          
          }
        
          
        
      ;
      reader.readAsArrayBuffer(file);
    }
}
}