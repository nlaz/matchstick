import React, { useState } from "react";
import { Moon, Sun } from "react-feather";

import Emoji from "../components/Emoji";
import Anchor from "../components/Anchor";
import Link from "../components/Link";

const Navbar = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  return (
    <div className="pv3 ph3 ph4-ns flex justify-between item-center">
      <Link to="/" className="f4 link navy b mv1">
        /matchstick
      </Link>
      <div className="flex items-center">
        <Anchor
          href="https://github.com/nlaz/matchstick"
          className="f5 flex items-center link navy mv1 mr1"
        >
          GitHub
        </Anchor>
        <button
          className="btn btn-icon ml2 pointer"
          onClick={() => setDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
