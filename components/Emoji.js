import React from "react";

const Emoji = ({ value, size = 30, className }) => (
  <span
    style={{ fontSize: `${size}px`, width: `${size}px`, height: `${size}px` }}
    className={className}
  >
    {value}
  </span>
);

export default Emoji;
