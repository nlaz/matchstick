import React, { Component } from "react";
import { X } from "react-feather";

const ErrorView = ({ error, onDismiss }) => (
  <div
    className="absolute flex justify-between items-center top-1 bg-red white ba b--red br3 ph3 pv2"
    style={{ width: "300px", left: "50%", transform: "translateX(-50%)" }}
  >
    <div className="fw5 truncate">{error.message}</div>
    <div className="ml3 mt1 pointer" onClick={onDismiss}>
      <X size={16} strokeWidth={3} />
    </div>
  </div>
);

export default ErrorView;
