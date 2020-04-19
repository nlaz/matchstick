import { Component } from "react";
import Head from "next/head";

const Layout = ({ children }) => (
  <div className="mukta flex flex-column" style={{ minHeight: "100vh" }}>
    <Head>
      <title>Matchstick - A tool to visually check designs</title>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    {children}
  </div>
);

export default Layout;
