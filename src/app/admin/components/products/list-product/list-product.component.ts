import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { List_Product } from '../../../../contracts/product/list_product';
import { SelectProductImageDialogComponent, SelectProductImageState } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../../services/admin/alertify.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { ProductService } from '../../../../services/common/models/product.service';
import {QrcodeDialogComponent} from "../../../../dialogs/qrcode-dialog/qrcode-dialog.component";

declare var $: any;

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate', 'photos', 'qrCode', 'edit', 'delete'];

  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  async ngOnInit() {
    await this.getProducts();
  }

  // get all products and fill the datasource of mat table
  async getProducts() {
    this.showSpinner(SpinnerType.BallAtom);

    const allProducts: { totalProductCount: number, products: List_Product[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => {
      this.hideSpinner(SpinnerType.BallAtom)
    },
      errorMessage => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertifyService.message(errorMessage, {
          dismissOthers: true,
          messageType: AlertifyMessageType.Error,
          position: AlertifyMessagePosition.TopRight
        })
      }
    )
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalProductCount;
  }

  async pageChanged() {
    this.showSpinner(SpinnerType.BallAtom)
    await this.getProducts();
  }

  addProductImages(productId: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: productId,
      options: {
        width: '1000px'
      }
    })
  }

  showQRCode(productId: string) {
    this.dialogService.openDialog({
      componentType: QrcodeDialogComponent,
      data: productId,
      afterClosed: () => { }
    })
  }
}
