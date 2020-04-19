import React from "react";

const Anchor = ({ children, className, href, ...props }) => (
  <a
    href={href}
    className={className}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
);

export default Anchor;
