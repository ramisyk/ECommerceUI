import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
declare var $: any;

@Component({
  selector: 'app-shopping-complete-dialog',
  templateUrl: './shopping-complete-dialog.component.html',
  styleUrls: ['./shopping-complete-dialog.component.css']
})
export class ShoppingCompleteDialogComponent extends BaseDialog<ShoppingCompleteDialogComponent> implements OnDestroy {
  constructor(dialogRef: MatDialogRef<ShoppingCompleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ShoppingCompleteState) {
    super(dialogRef);
  }

  show: boolean = true;
  complete() {
    this.show = false;
  }
  ngOnDestroy(): void {
    if (this.show){
      $("#basketModal").modal("show");
    }
  }
}

export enum ShoppingCompleteState {
  Yes,
  No
}
