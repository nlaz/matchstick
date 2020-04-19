import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

const HomePage = () => (
  <Layout>
    <Navbar />
    <h1 className="fw6" style={{ flex: 1 }}>
      Matchstick
    </h1>
    <Footer />
  </Layout>
);

export default HomePage;
