import { Injectable } from '@angular/core';

declare var alertify: any;


@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    const msj = alertify[options.messageType](message);
    if (options.dismissOthers)
      msj.dismissOthers();

  }

  dismiss() {
    alertify.dismissAll();
  }

}

export class AlertifyOptions {
  messageType: AlertifyMessageType = AlertifyMessageType.Message;
  position: AlertifyMessagePosition = AlertifyMessagePosition.BottomLeft;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum AlertifyMessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum AlertifyMessagePosition {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}
