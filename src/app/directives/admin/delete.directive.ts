import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../services/admin/alertify.service';
import { HttpClientService } from '../../services/common/http-client.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  // for use all models, http client service injected in Delete Directive
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService
  ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallAtom);
      const td: HTMLTableCellElement = this.element.nativeElement;

      this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toogle"
        }, 700, () => {
          this.callback.emit();
          this.alertifyService.message("Deleted", {
            messageType: AlertifyMessageType.Success,
            position: AlertifyMessagePosition.TopRight
          })
        });
      },
        (errorResponse: HttpErrorResponse) => {
          this.spinner.hide(SpinnerType.BallAtom)
          this.alertifyService.message(errorResponse.error, {
            messageType: AlertifyMessageType.Error,
            position: AlertifyMessagePosition.TopRight
          })
        })
    });

  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed()
      }
    });
  }
}
