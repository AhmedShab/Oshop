import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  category: string;
  filteredProduct: Product[] = [];
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  populateProducts() {
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
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProduct = this.category
      ? this.products.filter(product => this.category === product.category)
      : this.products;
  }
}
