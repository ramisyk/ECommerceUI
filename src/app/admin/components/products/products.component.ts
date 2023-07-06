import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';
import { Create_Product } from '../../../contracts/create_product';
import { ListProductComponent } from './list-product/list-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  @ViewChild(ListProductComponent) listComponents: ListProductComponent; 

  createdProduct(createdProduct: Create_Product) {
    this.listComponents.getProducts();
  }
}
