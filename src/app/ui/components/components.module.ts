import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { BasketModule } from './basket/basket.module';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import {PasswordResetModule} from "./password-reset/password-reset.module";
import {UpdatePasswordModule} from "./update-password/update-password.module";

@NgModule({
  declarations: [
    ],
  imports: [
    CommonModule,
    ProductsModule,
    BasketModule,
    HomeModule,
    RegisterModule,
    PasswordResetModule,
    UpdatePasswordModule
    //LoginModule
  ],
  exports : [
    BasketModule
  ]
})
export class ComponentsModule {}
