import React from "react";
import { Download } from "react-feather";

import Input from "../../components/Input";
import comparison from "../../images/matchstick-comparison.jpg";

const Form = () => (
  <div className="mr3" style={{ flex: 1 }}>
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
    <div className="bg-white shadow-4 center pa4 br3">
      <img src={comparison} />
    </div>
  </div>
);

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
  <div className="flex mb4">
    <Form />
    <Options />
  </div>
);

export default FormSection;
