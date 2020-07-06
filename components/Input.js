import React from "react";

const Input = ({ className, ...props }) => (
  <input
    className={`input w-100 db bg-white ba dark-gray ${className}`}
    {...props}
  />
);

export default Input;
