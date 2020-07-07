import React, { Component } from "react";
import Head from "next/head";
import { initGA, logPageView } from "../helpers/analytics";

class Layout extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    return (
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
          <meta property="og:title" content="Matchstick" />
          <meta
            property="og:description"
            content="A tool to visually compare your website and mockups to pinpoint the missing details."
          />
          <meta
            name="twitter:description"
            content="A tool to visually compare your website and mockups to pinpoint the missing details."
          />
          <meta property="og:url" content="https://matchstick.design" />
          <meta property="og:type" content="website" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
