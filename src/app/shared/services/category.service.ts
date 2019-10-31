import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { snapshotChanges } from '../../utils/firebase';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    let list = this.db.list('/categories', ref => ref.orderByChild('name'));
    return snapshotChanges(list);
  }
}
