import { Dish } from "@/types/Types";

export class Cart {
  dishes: Dish[];
  totalPrice: number;
  constructor(cartRecord: { dishes: Dish[]; totalPrice: number }) {
    const { dishes, totalPrice } = cartRecord;
    this.dishes = dishes;
    this.totalPrice = totalPrice;
  }
}

const buildDummyCart = () => ({
  dishes: [],
  totalPrice: 0,
});

export const EMPTY_CART: Readonly<Cart> = new Cart(buildDummyCart());
