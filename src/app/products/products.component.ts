import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from 'src/app/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  category: string;
  filteredProduct: Product[] = [];
  cart: any;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private cartService: ShoppingCartService
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

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(
      cart => (this.cart = cart)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
