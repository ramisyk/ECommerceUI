import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {BaseComponent, SpinnerType} from '../../../base/base.component';
import {BasketService} from "../../../services/common/models/basket.service";
import {List_Basket_Item} from "../../../contracts/basket/list_basket_item";
import {Update_Basket_Item} from "../../../contracts/basket/update_basket_item";
import {
  CustomToastrService,
  ToastrMessagePosition,
  ToastrMessageType
} from "../../../services/ui/custom-toastr.service";
import {Router} from "@angular/router";
import {OrderService} from "../../../services/common/models/order.service";
import {Create_Order} from "../../../contracts/order/create_order";

declare var $: any;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private customToastrService: CustomToastrService,
    private basketService: BasketService,
    private orderService: OrderService,
    private router: Router) {
    super(spinner);
  }

  basketItems: List_Basket_Item[];
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom)
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.BallAtom)
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallAtom)
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallAtom)

  }

  async removeBasketItem(basketItemId: string) {
    this.showSpinner(SpinnerType.BallAtom);
    await this.basketService.remove(basketItemId);

    $("." + basketItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.BallAtom));

  }

  async complete() {
    this.showSpinner(SpinnerType.BallAtom);
    const order: Create_Order = new Create_Order();
    order.address = "Yenimahalle";
    order.description = "Bir şeyler aldık ...";
    await this.orderService.create(order);
    this.hideSpinner(SpinnerType.BallAtom);
    this.customToastrService.message("Order is Created successfully!", "Order Created!", {
      messageType: ToastrMessageType.Info,
      position: ToastrMessagePosition.TopRight
    })
    await this.router.navigate(["/"]);
  }
}
