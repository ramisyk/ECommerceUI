import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { ListOrderComponent } from './list-order/list-order.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FileUploadModule} from "../../../services/common/file-upload/file-upload.module";
import {DialogsModule} from "../../../dialogs/dialogs.module";
import {DeleteDirectiveModule} from "../../../directives/admin/delete.directive.module";



@NgModule({
  declarations: [
    OrdersComponent,
    ListOrderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: OrdersComponent}
    ]),
    MatPaginatorModule,
    MatTableModule,
    MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule,
    FileUploadModule,
    DialogsModule,
    DeleteDirectiveModule
  ]
})
export class OrdersModule { }
