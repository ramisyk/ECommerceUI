import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { BasketModule } from './basket/basket.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    ProductsModule,
    BasketModule
  ],
})
export class ComponentsModule {}
