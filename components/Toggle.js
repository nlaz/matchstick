import React from "react";

const Toggle = ({ onClick, value }) => (
  <div className="relative mr2">
    <input
      className="absolute z-5 w-100 h-100 o-0 pointer checkbox"
      type="checkbox"
      value={value}
      onClick={onClick}
    />
    <div className="checkbox-wrapper relative overflow-hidden bg-animate ba b--navy">
      <div className="checkbox-toggle absolute bg-navy "></div>
    </div>
  </div>
);

export default Toggle;
