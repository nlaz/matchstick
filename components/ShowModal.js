import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "react-feather";

import Modal from "./Modal";
import DismissButton from "./DismissButton";

const titles = ["Website snapshot", "Mockup file", "Compared view"];

const Index = ({ active }) => (
  <div
    className={`mh1 ${active ? "bg-black" : "bg-light-gray"}`}
    style={{ width: "50px", height: "6px" }}
  />
);

const onPrev = index => (index > 0 ? index - 1 : 2);
const onNext = index => (index + 1) % 3;

const ShowModal = ({ onDismiss, input, output, comparison }) => {
  const images = [input, output, comparison];
  const [index, setIndex] = useState(0);
  return (
    <Modal
      onDismiss={onDismiss}
      onNext={() => setIndex(onNext(index))}
      onPrev={() => setIndex(onPrev(index))}
    >
      <div className="flex">
        <div className="w-third" />
        <div className="w-third mv3">
          <h4 className="fw5 mb3">{titles[index]}</h4>
          <div className="flex justify-center items-center mb4">
            <Index active={index === 0} />
            <Index active={index === 1} />
            <Index active={index === 2} />
          </div>
        </div>
        <div className="w-third">
          <DismissButton onClick={onDismiss} />
        </div>
      </div>
      <div className="overlay-wrapper relative">
        <div className="flex">
          <div
            className="mr3 mt7 moon-gray"
            onClick={() => setIndex(onPrev(index))}
          >
            <ChevronLeft size={40} />
          </div>
          <div>
            <img
              className="ba b--light-gray br2"
              src={images[index]}
              alt="Comparison"
            />
          </div>
          <div
            className="ml3 mt7 moon-gray"
            onClick={() => setIndex(onNext(index))}
          >
            <ChevronRight size={40} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShowModal;
