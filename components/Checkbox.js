import React from "react";

const Checkbox = ({ className, ...props }) => (
  <input type="checkbox" className="checkbox" {...props} />
);

export default Checkbox;
