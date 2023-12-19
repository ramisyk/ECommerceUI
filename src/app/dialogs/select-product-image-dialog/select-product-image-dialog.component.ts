import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { async } from 'rxjs';
import { SpinnerType } from '../../base/base.component';
import { List_Product_Image } from '../../contracts/list_product_image';
import { DialogService } from '../../services/common/dialog.service';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.css']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService : DialogService
  ) {
    super(dialogRef)
  }

  images: List_Product_Image[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom)
    this.images = await this.productService.readImages(this.data as string, () => {
      this.spinner.hide(SpinnerType.BallAtom);
    });
  }

  async getProductImages(productId: string) {
    this.spinner.show(SpinnerType.BallAtom)
    this.images = await this.productService.readImages(this.data as string, () => {
      this.spinner.hide(SpinnerType.BallAtom);
    });
  }

  async deleteImage(imageId: string) {

    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom)
        await this.productService.deleteImage(this.data as string, imageId as string, async () => {
          // this.spinner.hide(SpinnerType.BallAtom);

          // this.spinner.show(SpinnerType.BallAtom)
          this.images = await this.productService.readImages(this.data as string, () => {
            this.spinner.hide(SpinnerType.BallAtom);
          });
        })
      }
    })
  }

  showCase(imageId: string) {
    // this.data is equal product id
    this.spinner.show(SpinnerType.BallAtom);
    this.productService.changeShowcaseImage(imageId, this.data.toString(), () => {
      this.spinner.hide(SpinnerType.BallAtom);

    } )
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: '.png, .jpg, .jpg, .gif',
    controller: 'products',
    action: 'UploadProductImage',
    isAdminPage: true,
    explanation: 'Please select or drop product image files...',
    queryString: `id=${this.data}`
  };
}

export enum SelectProductImageState {
  Close
}
