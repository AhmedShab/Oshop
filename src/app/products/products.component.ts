import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories$: Observable<any[]>;
  category: string;
  filteredProduct: Product[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
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
    this.categories$ = this.categoryService.getAll();
  }

  ngOnInit() {}
}
