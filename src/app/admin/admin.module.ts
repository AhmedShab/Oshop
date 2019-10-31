import { NgModule } from '@angular/core';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [SharedModule]
})
export class AdminModule {}
