import { producthUseCaseProviders } from './../../../data/factory/productFactory';
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
  selectedOriginalSale!: SaleEntity 

  returnReason = '';
  constructor(    private socketService: SocketService,    private readonly productRepository: ProductRepository<productModel>,
   public  authService: AuthService ) { }
  
 
  factoryBranch = BranchUseCaseProviders
  factory = producthUseCaseProviders;
  quantityChanges: any[] = []
  sales: SaleEntity[] = [];  
  branchsList: IBranchModel[] = [];
  selectedBranchId!: string;
  products: IproductEntity[] = [];

  ngOnInit(): void {
    this.products = this.authService.getSelectedBranchProducts();

    this.selectedBranchId = this.authService.getSelectedBranchId();
    this.sales = this.authService.getSelectedBranchSales()
    this.socketService.listenToEvent(`saleEvent_${this.selectedBranchId}` || `saleEvente_${this.selectedBranchId}`).subscribe((data) => {
       const sales = JSON.parse(data) as SaleEntity;
    const existingSale = this.sales.find(sale => sale.id === sales.id );
      console.log(sales)
    if (!existingSale) {
      if (sales.id !== null || sales.type !== '') {
        this.sales.push(sales);
        console.log(this.sales)
      }
  }
})
}
  

sortSalesByField(field: string) {
  switch (field) {
    case 'type':
      this.sales.sort((a, b) => a.type.localeCompare(b.type));
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
  this.selectedOriginalSale = { ...sale };
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
  if (this.selectedSale.productName) {
    const productsName = JSON.stringify(this.selectedSale.productName);
    const productsQuantity = productsName.replace(/,/g, '');
    console.log(productsQuantity);
    const originalSale = this.selectedOriginalSale.productName
    console.log(originalSale)
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
    console.log(' la cantidad es: ' +productsQuantity)
    while ((match = regex.exec(productsQuantity)) !== null) {
      const name = match[1].trim().replace(/"/g, '');
      const quantity = parseInt(match[2], 10);
      const productId = ''
      mappedData.push({ name, quantity, productId });
    }
    const OriginalmappedData: IproductEntity[] = [];

    const originalProduct = JSON.stringify(originalSale)
    const originalQuantity = originalProduct.replace(/,/g, '');
    console.log(' la cantidad es: ' +originalQuantity)
    while ((match = regex.exec(originalQuantity)) !== null) {
      const name = match[1].trim().replace(/"/g, '');
      const quantity = parseInt(match[2], 10);
      const productId = ''
      const branchId = ''
      const category = ''
      const description = ''
      const price =   0
            OriginalmappedData.push({ name, quantity, productId, branchId, category, description ,price });
    }
    console.log('OriginalmappedData')

    console.log(OriginalmappedData)
    console.log('OriginalmappedData')

    mappedData.forEach((item) => {
      const matchingProduct = this.products.find((product) => product.name === item.name, );
      const matchingOriginal = OriginalmappedData.find((original) => original.name === item.name, );

      if (matchingProduct) {
        item.productId = matchingProduct.productId;
        item.quantity = matchingOriginal!.quantity - item.quantity;
        console.log(matchingOriginal!.quantity)
        console.log('matchingProduct')
        console.log(matchingProduct)
        console.log('matchingProduct')
        matchingProduct.quantity =  item.quantity
        console.log(matchingProduct.quantity)

      }
    });


    const requestBody = { branchID: this.selectedBranchId,       
      idSale: modifiedData,
      product: mappedData,  }
      console.log(requestBody)
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