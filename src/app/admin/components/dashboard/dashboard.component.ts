import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';
import { SignalRService } from 'src/app/services/common/signalr.service';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { HubUrls } from 'src/app/constants/hub-urls';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private signalRService:SignalRService) {
    super(spinner);
    signalRService.start(HubUrls.ProductsHub);
  }
  ngOnInit() {
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertifyService.message(message, {
        delay:1
      });
    });
  }
}
