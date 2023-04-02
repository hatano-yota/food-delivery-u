import React from "react";
import App from "next/app";
import Head from "next/head";
import Layout from "@/components/common/Layout";
import withData from "@/lib/apollo";
import AppContext from "@/context/AppContext";
import Cookies from "js-cookie";

class MyApp extends App {
  state = {
    user: null,
    cart: { dishes: [], totalPrice: 0 },
  };
  setUser = (user) => {
    this.setState({ user });
  };

  // カートへ商品の追加
  addDish = (dish) => {
    let { dishes } = this.state.cart;
    const repeat = dishes.find((d) => d.id === dish.id);
    if (!repeat) {
      dish.quantity = 1;
      // カートに新たな商品を追加する
      this.setState(
        {
          cart: {
            dishes: [...dishes, dish],
            totalPrice: this.state.cart.totalPrice + dish.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.dishes),
      );
    }
    // すでに同じ商品がカートにあるとき
    else {
      this.setState(
        {
          cart: {
            dishes: this.state.cart.dishes.map((d) =>
              d.id === repeat.id ? Object.assign({}, d, { quantity: d.quantity + 1 }) : d,
            ),
            totalPrice: this.state.cart.totalPrice + repeat.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.dishes),
      );
    }
  };

  // カートから商品を削除
  removeDish = (dish) => {
    if (dish.quantity > 1) {
      this.setState(
        {
          cart: {
            dishes: this.state.cart.dishes.map((d) =>
              d.id === dish.id ? Object.assign({}, d, { quantity: d.quantity - 1 }) : d,
            ),
            totalPrice: this.state.cart.totalPrice - dish.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.dishes),
      );
    }
    // カートに入っている該当商品が一つの場合
    else {
      this.setState(
        {
          cart: {
            dishes: this.state.cart.dishes.filter((d) => d.id !== dish.id),
            totalPrice: this.state.cart.totalPrice - dish.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.dishes),
      );
    }
  };

  // ユーザーのクッキー情報が残っているか確認する
  componentDidMount() {
    const token = Cookies.get("token"); // tokenの中にjwtが入っている
    const cart = Cookies.get("cart");

    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(async (res) => {
        if (!res.ok) {
          Cookeis.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user); // ログイン
      });
    }

    if (cart) {
      JSON.parse(cart).forEach((dish) => {
        this.setState({
          cart: {
            dishes: JSON.parse(cart),
            totalPrice: (this.state.cart.totalPrice += dish.price * dish.quantity),
          },
        });
      });
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          cart: this.state.cart,
          setUser: this.setUser,
          addDish: this.addDish,
          removeDish: this.removeDish,
        }}
      >
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
          />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    );
  }
}

export default withData(MyApp);
