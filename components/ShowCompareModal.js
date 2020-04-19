import React from "react";

import Modal from "./Modal";
import DismissButton from "./DismissButton";

import "./Overlay.css";

const ShowCompareModal = ({ onDismiss, image }) => (
  <Modal onDismiss={onDismiss}>
    <div className="flex items-center mb2 mt2">
      <DismissButton onClick={onDismiss} />
    </div>
    <div className="overlay-wrapper relative">
      <a
        href={image}
        className="overlay bg-white-40 aspect-ratio--object pointer cursor"
        download
      >
        <img
          className="w-100 mv7"
          style={{ maxWidth: "160px" }}
          src={require("./download.svg")}
          alt="Download"
        />
      </a>
      <img className="ba b--light-gray br2" src={image} alt="Comparison" />
    </div>
  </Modal>
);

export default ShowCompareModal;
