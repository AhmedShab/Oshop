import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShippingAddress } from '../models/shipping-address';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  shipping = {} as ShippingAddress;
  cart: ShoppingCart;
  userId: string;
  cart$: Observable<ShoppingCart>;
  orderSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.orderSubscription = this.cart$.subscribe(cart => (this.cart = cart));
    this.userSubscription = this.authService.user$.subscribe(
      user => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  placeOrder() {
    let order = {
      userId: this.userId,
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
