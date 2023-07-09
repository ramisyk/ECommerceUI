import { Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export class BaseDialog<DialogComponent> {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: DeleteState,
  ) { }

  close(): void {
    this.dialogRef.close();
  }

}
