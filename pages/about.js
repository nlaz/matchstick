import React from "react";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Anchor from "../components/Anchor";

const AboutPage = () => (
  <Layout>
    <Navbar />
    <div className="ph3 navy mw6 center w-100 mt4 pt5" style={{ flex: 1 }}>
      <h1 className="mb2">/matchstick</h1>
      <div className="bb" />
      <p className="lh-copy">
        This site was created by Elizabeth, Niko, and Justin, on a bus, a{" "}
        <Anchor className="navy" href="https://startupbus.com/">
          StartupBus
        </Anchor>
        . Because of your support, we won first place in the competition and
        since then its been crazy.
      </p>

      <p className="lh-copy">
        We plan to continue working on this project as quickly as possible. You
        can do us a favor and sign up to hear our future updates.
      </p>
    </div>
    <Footer />
  </Layout>
);

export default AboutPage;
