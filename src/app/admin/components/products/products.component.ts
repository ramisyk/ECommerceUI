import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';
import { Create_Product } from '../../../contracts/product/create_product';
import { ListProductComponent } from './list-product/list-product.component';
import {HttpClientService} from "../../../services/common/http-client.service";
import {DialogService} from "../../../services/common/dialog.service";
import {QrcodeReadingDialogComponent} from "../../../dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService,
    private dialogService: DialogService) {
    super(spinner)
  }

  @ViewChild(ListProductComponent) listComponents: ListProductComponent;

  createdProduct(createdProduct: Create_Product) {
    this.listComponents.getProducts();
  }

  showProductQrCodeReading() {
    this.dialogService.openDialog({
      componentType: QrcodeReadingDialogComponent,
      data: null,
      options: {
        width: "1000px"
      },
      afterClosed: () => { }
    });
  }
}
