import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { Dish } from "@/types/Types";
import { cartState } from "@/hooks/atom/cart";

// カートへ商品の追加
export const addDish = (selectedDish: Dish) => {
  const [cart, setCart] = useRecoilState(cartState);

  const dup = cart.dishes.find((dish) => dish.id === selectedDish.id);
  if (!dup) {
    selectedDish.quantity = 1;
    // カートに新たな商品を追加する
    setCart({
      dishes: [...cart.dishes, selectedDish],
      totalPrice: cart.totalPrice + selectedDish.price,
    });
    () => Cookies.set("cart", JSON.stringify(cart.dishes));
  }
  // すでに同じ商品がカートにあるとき
  else {
    setCart({
      dishes: cart.dishes.map((dish) =>
        dish.id === dup.id ? Object.assign({}, dish, { quantity: dish.quantity + 1 }) : dish,
      ),
      totalPrice: cart.totalPrice + dup.price,
    });
    () => Cookies.set("cart", JSON.stringify(cart.dishes));
  }
};
