import { BranchRepository, IBranchModel, ProductRepository, UserRepository, productModel } from 'src/app/domain';
import { Component, OnInit } from '@angular/core';
import { userUseCaseProviders } from 'src/app/data/factory/userfactory';
import { BranchUseCaseProviders } from 'src/app/data/factory/branchFactory';
import { IuserRegister } from 'src/app/domain/models/userRegister';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/data/repository/auth/auth.service';
import { SocketService } from 'src/app/data/repository/webSoket/socketService';
import { IproductEntity, UserEntity } from 'src/app/data/repository';
import { SaleEntity } from 'src/app/data/repository/entities/sale.entity';
import { producthUseCaseProviders } from 'src/app/data/factory/productFactory';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  showReturnForm = false;
  selectedSale!: SaleEntity 
  returnReason = '';
  constructor(    private socketService: SocketService,    private readonly productRepository: ProductRepository<productModel>,
   public  authService: AuthService ) { }
  
 
  factoryBranch = BranchUseCaseProviders
  factory = producthUseCaseProviders;
  quantityChanges: any[] = []
  sales: any[] = [];  
  branchsList: IBranchModel[] = [];
  selectedBranchId!: string;
  products: IproductEntity[] = [];

  ngOnInit(): void {
    this.products = this.authService.getSelectedBranchProducts();

    this.selectedBranchId = this.authService.getSelectedBranchId();
    this.sales = this.authService.getSelectedBranchSales()
    this.socketService.listenToEvent(`saleEvent_${this.selectedBranchId}`).subscribe((data) => {
       const sales = JSON.parse(data) as SaleEntity;
    const existingSale = this.sales.find(sale => sale.id === sales.id && sale.quantity === sales.quantity);

    if (!existingSale) {
      this.sales.push(sales);
    } 
  }
    )
}
  

sortSalesByField(field: string) {
  switch (field) {
    case 'type':
      this.sales.sort((a, b) => a.type.localeCompare(b.type));
      break;
    case 'quantity':
      this.sales.sort((a, b) => a.quantity - b.quantity);
      break;
    case 'cost':
      this.sales.sort((a, b) => a.productPrice - b.productPrice);
      break;
    default:
      this.sales.sort((a, b) => a.type.localeCompare(b.type));
      break;
  }
}
  


editSale(sale: any) {
  console.log(this.showReturnForm)
  this.selectedSale = { ...sale };
  this.returnReason = ''; 
  this.showReturnForm = true; 

}
saveSaleChanges(): void {
  if (!this.selectedSale) {
    console.log('No se ha seleccionado ninguna venta.');
    return;
  }

  const index = this.sales.findIndex((sale) => sale.id === this.selectedSale.id);
  if (index !== -1) {
    this.sales[index] = { ...this.selectedSale };
  }
  const quantityChanges: any[] = [];
  if (this.selectedSale.productName) {
    const productsName = JSON.stringify(this.selectedSale.productName);
    const productsQuantity = productsName.replace(/,/g, '');
    console.log(productsQuantity);

    console.log(quantityChanges);
    const modifiedData: SaleEntity = {
      id: this.selectedSale.id,
      quantity: this.selectedSale.quantity,
      invoiceNumber: this.selectedSale.invoiceNumber,
      productName: this.selectedSale.productName,
      productPrice: this.selectedSale.productPrice,
      type: this.selectedSale.type,
    };

    const regex = /([^()]+) \((\d+)\)/g;
    let match;
    const mappedData = [];

    while ((match = regex.exec(productsQuantity)) !== null) {
      const name = match[1].trim().replace(/"/g, '');
      const quantity = parseInt(match[2], 10);
      const productId = ''
      mappedData.push({ name, quantity, productId });
    }
    mappedData.forEach((item) => {
      const matchingProduct = this.products.find((product) => product.name === item.name);
    
      if (matchingProduct) {
        item.productId = matchingProduct.productId;
      }
    });


    const requestBody = { branchID: this.selectedBranchId,       
      idSale: modifiedData,
      product: mappedData,  }
    this.factory.returnSale.useFactory(this.productRepository)
      .execute(   requestBody)
      .subscribe(() => {
        this.showReturnForm = false;
      });
  }
}

showReturnFormForSale(sale: SaleEntity): void {
  this.selectedSale = sale;
  this.showReturnForm = true;
}

exportPDF() {
  const doc = new jsPDF();
  doc.text('Lista de Ventas', 10, 10);
  const columns = ['Número de Factura', 'Nombre del Producto', 'Tipo de factura', 'Cantidad', 'Costo Total'];

  const customerSales = this.sales.filter(sale => sale.type === 'customerSales');
  const resellerSales = this.sales.filter(sale => sale.type === 'resellerSales');

  this.addTableToPDF(doc, 'CustomerSales', customerSales, columns, 20);
  doc.addPage()
  this.addTableToPDF(doc, 'ResellerSales', resellerSales, columns, 40);

  doc.save('lista_ventas.pdf');
}

addTableToPDF(doc: jsPDF, title: string, data: any[], columns: string[], startY: number) {
  doc.setFontSize(12);
  doc.text(title, 10, startY);

  const tableData = data.map(sale => [
    sale.invoiceNumber,
    sale.productName,
    sale.type,
    sale.quantity,
    sale.productPrice
  ]);

  autoTable(doc, {
    head: [columns],
    body: tableData,
    startY: startY + 10,
    margin: { top: 10 }
  });
}

}