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
    <div className="ph3 ph4-m navy center w-100" style={{ flex: 1 }}>
      <HeaderSection />
      <FormSection />
    </div>
    <Footer />
  </Layout>
);

export default HomePage;
