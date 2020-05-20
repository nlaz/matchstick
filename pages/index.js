import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

import HeaderSection from "../sections/home/HeaderSection";
import FormSection from "../sections/home/FormSection";
import NewFormSection from "../sections/home/NewFormSection";
import ResultsSection from "../sections/home/ResultsSection";

const HomePage = () => (
  <Layout>
    <Navbar />
    <div className="ph4 navy center w-100" style={{ flex: 1 }}>
      <HeaderSection />
      <NewFormSection />
    </div>
    <Footer />
  </Layout>
);

export default HomePage;
