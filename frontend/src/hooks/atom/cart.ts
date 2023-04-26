import { atom } from "recoil";
import { Cart } from "@/types/Types";

export const DEFAULT_CART = (): Cart => ({
  dishes: [],
  totalPrice: 0,
});

export const cartState = atom<Cart>({
  key: "cartState",
  default: DEFAULT_CART(),
});
