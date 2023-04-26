import React, { useEffect } from "react";
import Head from "next/head";
import { Container } from "reactstrap";
import Header from "@/components/common/Header";
import Cookies from "js-cookie";
import { userState } from "@/hooks/atom/user";
import { cartState } from "@/hooks/atom/cart";
import { useSetRecoilState } from "recoil";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const setUser = useSetRecoilState(userState);
  const setCart = useSetRecoilState(cartState);

  // ユーザーのクッキー情報が残っているか確認する
  useEffect(() => {
    const token = Cookies.get("token"); // tokenの中にjwtが入っている
    const cart = Cookies.get("cart");

    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(async (res) => {
        if (!res.ok) {
          Cookies.remove("token");
          setUser(null);
          return null;
        }
        const user = await res.json();
        setUser(user); // ログイン
      });
    }

    if (cart) {
      setCart({
        dishes: JSON.parse(cart).dishes,
        totalPrice: JSON.parse(cart).totalPrice,
      });
    }
  }, []);

  return (
    <div>
      <Head>
        <title>フードデリバリーサービス</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        />
      </Head>
      <Header />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
