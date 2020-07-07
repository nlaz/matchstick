import React from "react";

import Emoji from "../components/Emoji";
import Anchor from "../components/Anchor";
import Link from "../components/Link";

const Navbar = () => (
  <div className="pv3 ph3 ph4-ns flex justify-between item-center">
    <Link to="/" className="f4 link navy b mv1">
      /matchstick
    </Link>
    <Anchor
      href="https://github.com/nlaz/matchstick"
      className="f5 flex items-center link navy mv1"
    >
      GitHub
    </Anchor>
  </div>
);

export default Navbar;
