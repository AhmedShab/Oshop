import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  isActive = true;
  products$: Observable<Product[]>;
  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();
  }

  ngOnInit() {}
}
