import { BranchRepository, IBranchModel, UserRepository } from 'src/app/domain';
import { Component, OnInit } from '@angular/core';
import { userUseCaseProviders } from 'src/app/data/factory/userfactory';
import { BranchUseCaseProviders } from 'src/app/data/factory/branchFactory';
import { IuserRegister } from 'src/app/domain/models/userRegister';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/data/repository/auth/auth.service';
import { SocketService } from 'src/app/data/repository/webSoket/socketService';
import { UserEntity } from 'src/app/data/repository';
import { SaleEntity } from 'src/app/data/repository/entities/sale.entity';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  constructor(    private socketService: SocketService,
   public  authService: AuthService ) { }
  
 
  factoryBranch = BranchUseCaseProviders

  sales: any[] = [];  
  branchsList: IBranchModel[] = [];
  selectedBranchId!: string;

  ngOnInit(): void {

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
  

  
  


}