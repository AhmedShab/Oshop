import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Product } from './models/roduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({
            key: c.key,
            ...c.payload.val()
          }));
        })
      );
  }

  get(productId): Observable<Product> {
    return this.db
      .object(`/products/${productId}`)
      .valueChanges() as Observable<Product>;
  }

  update(productId, product) {
    return this.db.object(`/products/${productId}`).update(product);
  }

  delete(productId) {
    this.db.object(`/products/${productId}`).remove();
  }
}
