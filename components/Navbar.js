import React, { useState } from "react";
import { Moon, Sun } from "react-feather";

import Emoji from "../components/Emoji";
import Anchor from "../components/Anchor";
import Link from "../components/Link";
import ProductHunt from "../components/ProductHunt";

const DarkMode = ({ isDarkMode }) => (
  <button
    className="btn btn-icon ml2 pointer"
    onClick={() => setDarkMode(!isDarkMode)}
  >
    {isDarkMode ? <Sun /> : <Moon />}
  </button>
);

const Navbar = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  return (
    <div className="pv3 ph3 ph4-ns flex justify-between item-center">
      <Link to="/" className="f4 link black b mv1">
        /matchstick
      </Link>
      <div className="flex justify-end flex-column flex-column-reverse flex-row-m flex-row-l items-center-ns">
        <div className="w-100 mt3 mt0-ns">
          <ProductHunt />
        </div>
        <Anchor
          href="https://github.com/nlaz/matchstick"
          className="f5 flex justify-end items-center black link mv2 mv1-ns ml4 mr1"
        >
          GitHub
        </Anchor>
      </div>
    </div>
  );
};

export default Navbar;
