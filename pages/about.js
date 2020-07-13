import React from "react";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Anchor from "../components/Anchor";

const AboutPage = () => (
  <Layout>
    <Navbar />
    <div className="ph3 ph4-m mw6 center w-100 mt4 pt5" style={{ flex: 1 }}>
      <h1 className="mb2">/matchstick</h1>
      <div className="bb" />
      <p className="lh-copy">
        Matchstick was originally created by{" "}
        <Anchor className="black" href="https://twitter.com/nikolazaris">
          Niko
        </Anchor>
        ,{" "}
        <Anchor className="black" href="https://twitter.com/MusingMurmurs">
          Elizabeth
        </Anchor>
        , and{" "}
        <Anchor className="black" href="https://twitter.com/justinisaf">
          Justin
        </Anchor>
        , on a bus, a{" "}
        <Anchor className="black" href="https://startupbus.com/">
          StartupBus
        </Anchor>
        . We were part of a bus-based startup competition as we traveled from
        New York to New Orlean. After a wild four days of hacking together an
        MVP, Matchstick won first place and we took home some bragging rights.
        🏆
      </p>

      <p className="lh-copy">
        Now Matchstick lives on as a free tool for designers and developers. We
        hope you find it useful. Let us know if you enjoy it.
      </p>
    </div>
    <Footer />
  </Layout>
);

export default AboutPage;
