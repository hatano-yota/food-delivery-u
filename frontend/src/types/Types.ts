export type Dish = {
  id: string;
  name: string;
  description?: string;
  image: { url: string; __typename: string };
  price: number;
  quantity: number;
  __typename: string;
};

export type Restaurant = {
  description?: string;
  id: string;
  image: [{ url: string; __typename: string }];
  name: string;
  __typename: string;
};

export type User = {
  id: number;
  email: string;
  username: string;
  confirmed: boolean;
};
