import { Dish, User } from "@/types/Types";
import { createContext } from "react";

type Props = {
  user?: User;
  cart?: { dishes: Dish[]; totalPrice: number };
  setUser?: (user: User) => void;
  addDish?: (dish: Dish) => void;
  removeDish?: (dish: Dish) => void;
};

const AppContext = createContext<Props>({});

export default AppContext;
