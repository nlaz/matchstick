import React, { useState } from "react";
import { Download, ChevronRight, ChevronLeft } from "react-feather";

import Modal from "./Modal";
import DismissButton from "./DismissButton";

import input from "../images/github-input.jpg";
import output from "../images/github-output.jpg";
import comparison from "../images/github-comparison.jpg";

const titles = ["Website snapshot", "Mockup file", "Compared view"];

const Index = ({ active, onClick }) => (
  <div
    className={`br3 mh1 pointer ${active ? "bg-black" : "bg-light-gray"}`}
    style={{ width: "50px", height: "6px" }}
    onClick={onClick}
  />
);

const onPrev = (index) => (index > 0 ? index - 1 : 2);
const onNext = (index) => (index + 1) % 3;

const ShowModal = ({ onDismiss, image1, image2, result }) => {
  const images = !!result
    ? [image1, image2, result]
    : [input, output, comparison];

  const [index, setIndex] = useState(0);
  return (
    <Modal
      onDismiss={onDismiss}
      onNext={() => setIndex(onNext(index))}
      onPrev={() => setIndex(onPrev(index))}
    >
      <div>
        <DismissButton onClick={onDismiss} />
      </div>

      <div className="overlay-wrapper relative">
        <div className="flex justify-center">
          <button
            className="btn-chevron mr3 mt8 dark-gray pointer flex items-center justify-center ph0"
            onClick={() => setIndex(onPrev(index))}
            style={{ height: "38px", width: "38px" }}
          >
            <ChevronLeft size={28} />
          </button>
          <div>
            <div className="flex items-end justify-between pv2 mb3 mt2">
              <div className="w-third tl">
                <h4 className="fw6 ma0">{titles[index]}</h4>
              </div>
              <div className="w-third">
                <div className="flex justify-center mb2">
                  <Index active={index === 0} onClick={() => setIndex(0)} />
                  <Index active={index === 1} onClick={() => setIndex(1)} />
                  <Index active={index === 2} onClick={() => setIndex(2)} />
                </div>
              </div>
              <div className="w-third tr">
                <button className="btn btn-download ml-auto pointer">
                  <Download size={16} style={{ paddingBottom: "1px" }} />
                  <span className="ml1">Download</span>
                </button>
              </div>
            </div>
            <img
              className="ba b--light-gray br2"
              src={images[index]}
              alt="Comparison"
            />
          </div>
          <button
            className="btn-chevron ml3 mt8 dark-gray pointer flex items-center justify-center ph0"
            onClick={() => setIndex(onNext(index))}
            style={{ height: "38px", width: "38px" }}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShowModal;
