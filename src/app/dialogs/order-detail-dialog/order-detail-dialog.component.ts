import {Component, Inject, OnInit} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../../services/common/models/order.service";
import {SingleOrder} from "../../contracts/order/single_order";
import {CustomToastrService, ToastrMessagePosition, ToastrMessageType} from "../../services/ui/custom-toastr.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DialogService} from "../../services/common/dialog.service";
import {
  CompleteOrderDialogComponent,
  CompleteOrderState
} from "../complete-order-dialog/complete-order-dialog.component";
import {SpinnerType} from "../../base/base.component";

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.css']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit{

  singleOrder: SingleOrder = new SingleOrder();

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number;

  constructor(
   dialogRef: MatDialogRef<OrderDetailDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
   private orderService: OrderService,
   private dialogService: DialogService,
   private spinner: NgxSpinnerService,
   private toastrService: CustomToastrService
 ) {
   super(dialogRef);
 }
  async ngOnInit(): Promise<void> {
    this.singleOrder = await this.orderService.getOrderById(this.data as string, () =>  console.log('başarılı'), () =>  console.log('hata'))
    this.dataSource = this.singleOrder.basketItems;
    this.totalPrice = this.singleOrder.basketItems.map((basketItem, index) => basketItem.price * basketItem.quantity).reduce((price, current) => price + current);
  }

  completeOrder() {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom)
        await this.orderService.completeOrder(this.data as string);
        this.spinner.hide(SpinnerType.BallAtom)
        this.toastrService.message("Sipariş başarıyla tamamlanmıştır! Müşteriye bilgi verilmiştir.", "Sipariş Tamamlandı!", {
          messageType: ToastrMessageType.Success,
          position: ToastrMessagePosition.TopRight
        });
      }
    });
  }
}
export enum OrderDetailDialogState {
  Yes, No
}
