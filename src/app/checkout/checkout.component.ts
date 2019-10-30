import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShippingAddress } from '../models/shipping-address';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  shipping = {} as ShippingAddress;
  cart: ShoppingCart;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.subscription = this.cart$.subscribe(cart => (this.cart = cart));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  placeOrder() {
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(item => {
        return {
          product: {
            title: item.title,
            imageUrl: item.imageUrl,
            price: item.price
          },
          quantity: item.quantity,
          totalPrice: item.totalPrice
        };
      })
    };
    this.orderService.storeOrder(order);
  }
}
