import React from "react";
import Head from "next/head";
import { Container } from "reactstrap";
import Header from "@/components/common/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
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
