import React from "react";

import Anchor from "./Anchor";
import Link from "./Link";

const Footer = () => (
  <div className="flex justify-between w-100 pv3 ph4 center">
    <div className="f6 fw5 navy mv2">Matchstick © 2020</div>
    <div className="mv2">
      <Link to="/about" className="link navy f6 mr3">
        About
      </Link>
      <Anchor href="mailto:getmatchstick@gmail.com" className="link navy f6">
        Contact
      </Anchor>
    </div>
  </div>
);

export default Footer;
