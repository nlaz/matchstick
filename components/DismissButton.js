import React from "react";
import { X } from "react-feather";

const DismissButton = ({ onClick }) => (
  <button
    className="bg-transparent bn f3 db"
    onClick={onClick}
    style={{ marginLeft: "auto" }}
  >
    <X />
  </button>
);

export default DismissButton;
