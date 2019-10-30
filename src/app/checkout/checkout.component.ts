import { Component, OnInit, OnDestroy } from '@angular/core';
import { Shipping } from '../models/shipping-address';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  shipping = {} as Shipping;
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
    let order = new Order(this.userId, this.shipping, this.cart);
    this.orderService.storeOrder(order);
  }
}
