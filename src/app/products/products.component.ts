import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from 'src/app/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  category: string;
  filteredProduct: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute
  ) {
    this.productService
      .getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.router.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProduct = this.category
          ? this.products.filter(product => this.category === product.category)
          : this.products;
      });
  }

  ngOnInit() {}
}
