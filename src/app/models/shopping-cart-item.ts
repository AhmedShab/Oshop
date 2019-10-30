import { Product } from 'src/app/models/product';

export class ShoppingCartItem {
  title: string;
  imageUrl: string;
  price: number;
  key: string;
  quantity: number;

  get totalPrice() {
    return this.price * this.quantity;
  }
}
