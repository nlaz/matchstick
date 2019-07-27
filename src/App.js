import React from "react";
import { BrowserRouter, Switch, Link, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import GoogleAnalytics from "./components/GoogleAnalytics";

import "./App.css";
import logo from "./logo-lockup.svg";

const NavBar = () => (
  <div className="proxima-nova white ph4 pv2">
    <div className="flex items-center justify-between">
      <Link to="/" className="white no-underline flex items-center pv3">
        <img src={logo} alt="Logo" height="29px" />
      </Link>
      <Link
        to="/pricing"
        className="br3 bg-white b pa3 no-underline orange"
        style={{
          dropShadow: "0 2px 8px rgba(0,0,0,.1)"
        }}
      >
        Upgrade Now - Go Pro
      </Link>
    </div>
  </div>
);

const Footer = () => (
  <div className="white ph4 pv4">
    <div className="flex items-center justify-between">
      <Link to="/" className="white no-underline flex items-center">
        <img src={logo} alt="Logo" height="24px" />
      </Link>
      <div>
        <Link to="/about" className="b near-white no-underline">
          About
        </Link>
        <a href="/" className="b near-white no-underline ml3">
          Contact
        </a>
      </div>
    </div>
  </div>
);

const NotFound = () => <div>Page Not Found</div>;

function App() {
  return (
    <div className="proxima-nova bg-fire-gradient relative">
      <BrowserRouter>
        <NavBar />
        <Route path="/" component={GoogleAnalytics} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/pricing" exact component={Pricing} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
