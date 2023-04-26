import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { Dish } from "@/types/Types";
import { cartState } from "@/hooks/atom/cart";

type useCartReturn = {
  addDish: (selectedDish: Dish) => void;
  removeDish: (selectedDish: Dish) => void;
};

export const useCart = (): useCartReturn => {
  const [cart, setCart] = useRecoilState(cartState);

  // カートへ商品の追加
  const addDish = (selectedDish: Dish) => {
    const dup = cart.dishes?.find((dish) => dish.id === selectedDish.id);
    if (!dup) {
      selectedDish.quantity = 1;
      // カートに新たな商品を追加する
      setCart({
        dishes: [...cart.dishes, selectedDish],
        totalPrice: cart.totalPrice + selectedDish.price,
      });
      Cookies.set("cart", JSON.stringify(cart));
    }
    // すでに同じ商品がカートにあるとき
    else {
      setCart({
        dishes: cart.dishes.map((dish) =>
          dish.id === dup.id ? Object.assign({}, dish, { quantity: dish.quantity + 1 }) : dish,
        ),
        totalPrice: cart.totalPrice + dup.price,
      });
      Cookies.set("cart", JSON.stringify(cart));
    }
  };
  // カートから商品を削除
  const removeDish = (selectedDish: Dish) => {
    if (selectedDish.quantity > 1) {
      setCart({
        dishes: cart.dishes.map((dish) =>
          dish.id === selectedDish.id
            ? Object.assign({}, dish, { quantity: dish.quantity - 1 })
            : dish,
        ),
        totalPrice: cart.totalPrice - selectedDish.price,
      });
      Cookies.set("cart", JSON.stringify(cart));
    }
    // カートに入っている該当商品が一つの場合
    else {
      setCart({
        dishes: cart.dishes.filter((dish) => dish.id !== selectedDish.id),
        totalPrice: cart.totalPrice - selectedDish.price,
      });
      Cookies.set("cart", JSON.stringify(cart));
    }
  };

  return { addDish, removeDish };
};
