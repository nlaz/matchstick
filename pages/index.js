import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

import HeaderSection from "../sections/home/HeaderSection";
import FormSection from "../sections/home/FormSection";
import ResultsSection from "../sections/home/ResultsSection";

const HomePage = () => (
  <Layout>
    <Navbar />
    <div className="ph3 navy mw9 center w-100 mt4" style={{ flex: 1 }}>
      <HeaderSection />
      <FormSection />
    </div>
    <Footer />
  </Layout>
);

export default HomePage;
