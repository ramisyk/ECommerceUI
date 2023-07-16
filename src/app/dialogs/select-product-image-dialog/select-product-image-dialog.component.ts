import { Component, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.css']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
  ) {
    super(dialogRef)
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
