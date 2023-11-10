import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {BaseComponent, SpinnerType} from '../../../base/base.component';
import {BasketService} from "../../../services/common/models/basket.service";
import {List_Basket_Item} from "../../../contracts/basket/list_basket_item";
import {Update_Basket_Item} from "../../../contracts/basket/update_basket_item";

declare var $: any;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketService) {
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
}
