import React, { useState } from "react";
import { Download, Maximize } from "react-feather";

import Input from "../../components/Input";
import ShowModal from "../../components/ShowModal";
import input from "../../images/matchstick-input.jpg";
import output from "../../images/matchstick-output.jpg";
import comparison from "../../images/matchstick-comparison.jpg";

const Form = () => {
  const [showModal, setShowModal] = useState(true);
  return (
    <div className="mr3" style={{ flex: 1 }}>
      {showModal && (
        <ShowModal
          onDismiss={() => setShowModal(false)}
          input={input}
          output={output}
          comparison={comparison}
        />
      )}
      <div className="flex mb4">
        <Input
          placeholder="Enter your website link"
          className="mr3 input-primary"
        />
        <button className="btn btn-primary flex items-center">
          <Download size={18} />
          <span className="ml2 mr2">Upload mockup file</span>
        </button>
      </div>
      <div className="bg-white shadow-4 center pa4 br3 relative">
        <img src={comparison} />
        <div
          className="pointer bg-white absolute flex items-center justify-center shadow-5 top-2 right-2 ma4 br-100"
          style={{ width: "56px", height: "56px" }}
          onClick={() => setShowModal(true)}
        >
          <Maximize />
        </div>
      </div>
    </div>
  );
};

const Options = () => (
  <div className="ml3" style={{ width: "360px" }}>
    <div className="f4 fw5 mb3 pb2">Options</div>
    <div className="mb3 pb2">
      <label className="f6 db mid-gray mb2">Orientation</label>
      <Input value="Vertical" />
    </div>
    <div className="mb3 pb2 flex">
      <div className="w-100 mr2">
        <label className="f6 db mid-gray mb2">Width</label>
        <Input value="1080px" />
      </div>
      <div className="w-100 ml2">
        <label className="f6 db mid-gray mb2">Height</label>
        <Input value="3080px" />
      </div>
    </div>
  </div>
);

const FormSection = () => (
  <div className="flex mb5">
    <Form />
    <Options />
  </div>
);

export default FormSection;
