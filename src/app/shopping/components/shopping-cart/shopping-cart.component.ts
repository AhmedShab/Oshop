import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(
    private cartService: ShoppingCartService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
