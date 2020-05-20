import { Component } from "react";
import Head from "next/head";

const Layout = ({ children }) => (
  <div
    className="sans-serif bg-washed-blue flex flex-column"
    style={{ minHeight: "100vh" }}
  >
    <Head>
      <title>Matchstick - A tool to visually check designs</title>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
    {children}
  </div>
);

export default Layout;
