import React from "react";
import { BrowserRouter, Switch, Link, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import "./App.css";
import logo from "./logo.png";

const NavBar = () => (
  <div className="bg-black white ph4 pv2">
    <div className="flex items-center justify-between">
      <Link to="/" className="white no-underline flex items-center">
        <img src={logo} alt="Logo" height="28px" />
        <h1 className="f4 ml2 normal">Matchstick</h1>
      </Link>
      <Link to="/pricing" className="white no-underline orange">
        Upgrade Now - Go Pro
      </Link>
    </div>
  </div>
);

const NotFound = () => <div>Page Not Found</div>;

function App() {
  return (
    <div className="helvetica bg-near-white">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/pricing" exact component={Pricing} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
