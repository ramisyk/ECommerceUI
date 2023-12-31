import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { Create_Product } from '../../../../contracts/product/create_product';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../../services/admin/alertify.service';
import { ProductService } from '../../../../services/common/models/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent extends BaseComponent implements OnInit {

  constructor(
    spiner: NgxSpinnerService,
    private alertify: AlertifyService,
    private productService: ProductService
  ) {
    super(spiner)
  }

  ngOnInit(): void {
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: Create_Product = new Create_Product();

    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ürün başarıyla eklenmiştir.", {
        dismissOthers: true,
        messageType: AlertifyMessageType.Success,
        position: AlertifyMessagePosition.TopRight
      });
      this.createdProduct.emit(create_product);
    }, errorMessage => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: AlertifyMessageType.Error,
        position: AlertifyMessagePosition.TopRight
      });
    });


  }
}
