import { atom } from "recoil";
import { Cart, EMPTY_CART } from "@/lib/Cart";

export const cartState = atom<Cart>({
  key: "cartState",
  default: EMPTY_CART,
});
