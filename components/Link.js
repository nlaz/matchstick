import React from "react";
import Link from "next/link";

const DefaultLink = ({ to, className, children, ...props }) => (
  <Link href={to}>
    <a className={className} {...props}>
      {children}
    </a>
  </Link>
);

export default DefaultLink;
