import React, { useState } from "react";

import input from "../../images/matchstick-input.jpg";
import output from "../../images/matchstick-output.jpg";
import comparison from "../../images/matchstick-comparison.jpg";

import Toggle from "../../components/Toggle";

const ResultsSection = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="mt4">
      <div className="flex pt1 mb2">
        <div className="w-100 mr2">
          <div className="f6 fw5 mb1 flex items-center">
            <Toggle onClick={() => setToggle(!toggle)} />
            {toggle ? (
              <span>This is how your mockup looks.</span>
            ) : (
              <span>This is how your live site looks.</span>
            )}
          </div>
          <img src={toggle ? input : output} className="mb0 br2 mt1" />
        </div>
        <div className="w-100 ml1">
          <div className="f6 fw5 mb1">This is how well it matches.</div>
          <img src={comparison} className="mb0 br2 mt1" />
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
