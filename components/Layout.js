import React, { Component } from "react";
import Head from "next/head";
import { initGA, logPageView } from "../helpers/analytics";

const title = "Matchstick - Visually compare your mockups and code.";
const description = "Highlight missing design details from your website.";

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
          <title>{title}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content="https://matchstick.design" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="images/social-card.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="images/social-card.jpg" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
