import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductModel } from '@domain/models';
import { ProductRepository } from '@domain/repository';
import { NotifierService } from 'angular-notifier';
import { GetProductUseCaseFactory } from 'data/factory';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css'],
})
export class IndividualProductComponent implements OnInit {
  productId = this.route.snapshot.paramMap.get('id');
  product: IProductModel | undefined;
  factory = GetProductUseCaseFactory;
  quantityClicked: boolean = false;
  numbersStock: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly productRepository: ProductRepository<IProductModel>,
    private readonly notifier: NotifierService
  ) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this.productRepository
      .getProductById(this.productId || '')
      .subscribe((data) => {
        this.product = data;
        console.log(this.product);
      });
  }

  addStock(): void {
    if (this.numbersStock <= 0) {
      this.notifier.notify('error', 'La cantidad debe ser mayor a 0');
      return;
    }
    this.productRepository
      .registerQuantity(this.productId || '', {
        quantity: this.numbersStock,
      })
      .subscribe({
        complete: () => {
          this.notifier.notify('success', 'Cantidad agregada con éxito');
          this.quantityClicked = true;
        },
        error: (error) => {
          this.notifier.notify(
            'error',
            error.error.message ? error.error.message : error
          );
        },
      });
  }
}
