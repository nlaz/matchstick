import React from "react";

import Anchor from "./Anchor";
import Link from "./Link";

const Footer = () => (
  <div className="flex justify-between items-center w-100 pv3 ph3 ph4-ns center">
    <div className="f6 fw5 mv2">Matchstick © 2020</div>
    <div className="mv2">
      <Link to="/about" className="link f6 mr3 black">
        About
      </Link>
      <Anchor href="mailto:hello@matchstick.xyzc" className="link black f6">
        Contact
      </Anchor>
    </div>
  </div>
);

export default Footer;
