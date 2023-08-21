import { Injectable } from '@nestjs/common';
import { CartDto } from '../Dto/cartdto';

@Injectable()
export class CartService {
  cart: CartDto[] = [];

  async addtocart(product: CartDto): Promise<CartDto[]> {
    this.cart.push(product);
    return this.cart;
  }

  async getcart(name: string): Promise<CartDto> {
    const user = this.cart.find((x) => x.name === name);
    if (user) {
      const obj: CartDto = {
        name: user.name,
        price: user.price,
      };
      console.log(obj);
      return obj;
    } else {
      throw new Error('User not found in cart');
    }
  }

  async deletecart(): Promise<void> {
    this.cart = [];
  }
  async getAllCartItems(): Promise<Record<string, CartDto>> {
    const cartItems: Record<string, CartDto> = {};

    this.cart.forEach((item) => {
      cartItems[item.name] = item;
      cartItems[item.price] = item;
    });

    return cartItems;
  }
}
