import React from "react";

const DismissButton = ({ onClick }) => (
  <button
    className="bg-transparent bn f3 db"
    onClick={onClick}
    style={{ marginLeft: "auto" }}
  >
    <img
      src={require("../dismiss.svg")}
      alt="Dismiss modal"
      height="20px"
      width="20px"
      style={{ opacity: 0.4 }}
    />
  </button>
);

export default DismissButton;
