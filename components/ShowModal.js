import React, { useState } from "react";

import Modal from "./Modal";
import DismissButton from "./DismissButton";

const ShowModal = ({ onDismiss, input, output, comparison }) => {
  const images = [input, output, comparison];
  const [index, setIndex] = useState(0);
  return (
    <Modal onDismiss={onDismiss}>
      <div className="flex items-center mb2 mt2">
        <DismissButton onClick={onDismiss} />
      </div>
      <div className="overlay-wrapper relative">
        <img
          className="ba b--light-gray br2"
          src={images[index]}
          alt="Comparison"
        />
      </div>
    </Modal>
  );
};

export default ShowModal;
