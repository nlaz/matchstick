import React from "react";
import { X } from "react-feather";

const DismissButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-transparent f3 flex justify-center items-center pointer bn br-100 mt3 moon-gray"
    style={{ marginLeft: "auto", height: "48px", width: "48px" }}
  >
    <X size={48} />
  </button>
);

export default DismissButton;
