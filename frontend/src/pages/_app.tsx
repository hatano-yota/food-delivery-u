import React from "react";
import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/common/Layout";
import withData from "@/lib/apollo";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        />
      </Head>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  );
}

export default withData(MyApp);
