import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { cartState } from "@/hooks/atom/cart";
import { Dish } from "@/types/Types";

// カートから商品を削除
export const removeDish = (selectedDish: Dish) => {
  const [cart, setCart] = useRecoilState(cartState);

  if (selectedDish.quantity > 1) {
    setCart({
      dishes: cart.dishes.map((dish) =>
        dish.id === selectedDish.id
          ? Object.assign({}, dish, { quantity: dish.quantity - 1 })
          : dish,
      ),
      totalPrice: cart.totalPrice - selectedDish.price,
    });
    () => Cookies.set("cart", JSON.stringify(cart.dishes));
  }
  // カートに入っている該当商品が一つの場合
  else {
    setCart({
      dishes: cart.dishes.filter((dish) => dish.id !== selectedDish.id),
      totalPrice: cart.totalPrice - selectedDish.price,
    });
    () => Cookies.set("cart", JSON.stringify(cart.dishes));
  }
};
