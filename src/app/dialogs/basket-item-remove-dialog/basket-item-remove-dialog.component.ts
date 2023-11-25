import {Component, Inject, OnDestroy} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
declare var $: any;
@Component({
  selector: 'app-basket-item-remove-dialog',
  templateUrl: './basket-item-remove-dialog.component.html',
  styleUrls: ['./basket-item-remove-dialog.component.css']
})
export class BasketItemRemoveDialogComponent extends BaseDialog<BasketItemRemoveDialogComponent> implements OnDestroy{
  constructor(dialogRef: MatDialogRef<BasketItemRemoveDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BasketItemRemoveState) {
    super(dialogRef);
  }

  ngOnDestroy(): void {
    // when dialog closed basket model should be opened
    $("#basketModal").modal("show");
  }

}

export enum BasketItemRemoveState {
  Yes,
  No
}
