import { Shipping } from './shipping-address';
import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlace: number;
  items: any[];

  constructor(
    public userId: string,
    public shipping: Shipping,
    shoppingCart: ShoppingCart
  ) {
    this.datePlace = new Date().getTime();
    this.items = shoppingCart.items.map(item => {
      return {
        product: {
          title: item.title,
          imageUrl: item.imageUrl,
          price: item.price
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice
      };
    });
  }
}
