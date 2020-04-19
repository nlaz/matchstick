import React from "react";

import Anchor from "./Anchor";
import Link from "./Link";

const Footer = () => (
  <div className="flex justify-between w-100 pa3">
    <div className="f6 fw5 navy">Matchstick © 2020</div>
    <div>
      <Link to="/about" className="link navy f6 mr3">
        about
      </Link>
      <Anchor href="mailto:getmatchstick@gmail.com" className="link navy f6">
        contact
      </Anchor>
    </div>
  </div>
);

export default Footer;
