import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

import HeaderSection from "../sections/home/HeaderSection";
import FormSection from "../sections/home/FormSection";

const HomePage = () => (
  <Layout>
    <Navbar />
    <div className="ph3 ph4-m black center w-100" style={{ flex: 1 }}>
      <HeaderSection />
      <FormSection />
    </div>
    <Footer />
  </Layout>
);

export default HomePage;
