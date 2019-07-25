import React from "react";
import { HashRouter, Switch, Link, Route } from "react-router-dom";
import Home from "./Home";
import "./App.css";

const NavBar = () => (
  <div className="bg-black white ph4 pv2">
    <div className="flex items-center justify-between">
      <Link to="/" className="white no-underline">
        <h1 className="f4 normal">Matchstick</h1>
      </Link>
      <Link to="/pricing" className="white no-underline orange">
        Upgrade Now - Go Pro
      </Link>
    </div>
  </div>
);

const Pricing = () => <div>Pricing Page</div>;

const NotFound = () => <div>Page Not Found</div>;

function App() {
  return (
    <div className="helvetica">
      <HashRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/pricing" exact component={Pricing} />
          <Route path="*" component={NotFound} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
