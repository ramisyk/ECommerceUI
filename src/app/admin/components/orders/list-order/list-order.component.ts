import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {List_Product} from "../../../../contracts/product/list_product";
import {MatPaginator} from "@angular/material/paginator";
import {NgxSpinnerService} from "ngx-spinner";
import {ProductService} from "../../../../services/common/models/product.service";
import {
  AlertifyMessagePosition,
  AlertifyMessageType,
  AlertifyService
} from "../../../../services/admin/alertify.service";
import {DialogService} from "../../../../services/common/dialog.service";
import {BaseComponent, SpinnerType} from "../../../../base/base.component";
import {
  SelectProductImageDialogComponent
} from "../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component";
import {List_Order} from "../../../../contracts/order/list_order";
import {OrderService} from "../../../../services/common/models/order.service";
import {OrderDetailDialogComponent} from "../../../../dialogs/order-detail-dialog/order-detail-dialog.component";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent extends BaseComponent implements OnInit{
  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createdDate', 'completed', 'viewDetail', 'delete'];

  dataSource: MatTableDataSource<List_Order> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    spinner: NgxSpinnerService,
    private orderService: OrderService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  async ngOnInit() {
    await this.getOrders();
  }

  async getOrders() {
    this.showSpinner(SpinnerType.BallAtom);

    const allOrders: { totalOrderCount: number; orders: List_Order[] } = await this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: AlertifyMessageType.Error,
      position: AlertifyMessagePosition.TopRight
    }));
    this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders);
    this.paginator.length = allOrders.totalOrderCount;
  }

  async pageChanged() {
    await this.getOrders();

  }

  showDetail(id: string) {
    this.dialogService.openDialog({
      componentType: OrderDetailDialogComponent,
      data: id,
      options: {
        width: "750px"
      }
    });

  }
}
