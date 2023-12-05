import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirective } from '../../../directives/admin/delete.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';
import { DialogsModule } from '../../../dialogs/dialogs.module';
import {DeleteDirectiveModule} from "../../../directives/admin/delete.directive.module";

@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    ListProductComponent,

    //DeleteDirective,
    //DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ProductsComponent }
    ]),
    DeleteDirectiveModule,
    MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule,
    FileUploadModule,
    DialogsModule
  ]
})
export class ProductsModule { }
