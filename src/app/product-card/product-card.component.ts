import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('show-actions') showActions = true;

  constructor(private cartService: ShoppingCartService) {}

  async addToCart(product: Product) {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      let result = await this.cartService.create();
      localStorage.setItem('cartId', result.key);
    }
  }
}
