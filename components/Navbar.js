import React from "react";

import Emoji from "../components/Emoji";
import Link from "../components/Link";

const Navbar = () => (
  <div className="pv2 ph3 flex justify-between item-center">
    <Link to="/" className="f4 link navy b mv1 ml2">
      /matchstick
    </Link>
    <Link to="/about" className="f5 flex items-center link navy mv1 mr2">
      about
    </Link>
  </div>
);

export default Navbar;
