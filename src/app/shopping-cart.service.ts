import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object(`/shopping-carts/${cartId}`)
      .snapshotChanges()
      .pipe(
        map(changes => {
          const newCart: any = changes.payload.val();
          return newCart ? new ShoppingCart(newCart.items) : null;
        })
      );
  }

  addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        let value = item.payload.val();
        item$.update({
          product: product,
          quantity: (value ? value.quantity : 0) + change
        });
      });
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);

    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }
}
