import React from "react";
import { X } from "react-feather";

const DismissButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-transparent f3 flex justify-center items-center pointer bn br-100 mt3 mid-gray"
    style={{ marginLeft: "auto", height: "42px", width: "42px" }}
  >
    <X size={36} />
  </button>
);

export default DismissButton;
