import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular-6-datatable';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [ProductCardComponent, ProductQuantityComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AppRoutingModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ]
})
export class SharedModule {}
