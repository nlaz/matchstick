import React, { Component } from "react";

import Modal from "./Modal";
import DismissButton from "./DismissButton";
import { ViewToggle } from "../pages/Home";

import "./Overlay.css";

class ShowInputModal extends Component {
  render() {
    const { onDismiss, image, toggleState, onToggle } = this.props;
    return (
      <Modal onDismiss={onDismiss}>
        <div className="flex items-center mt2 mb1">
          <div className="b mb2 flex items-center">
            <ViewToggle onChange={onToggle} checked={toggleState === "input"} />
            <span className="mt1">
              This is how your{" "}
              {toggleState === "input" ? "designs look." : "live site looks."}{" "}
            </span>
          </div>
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
              alt="Download button"
            />
          </a>
          <img className="ba b--light-gray br2" src={image} alt="Comparison" />
        </div>
      </Modal>
    );
  }
}

export default ShowInputModal;
