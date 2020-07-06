import React, { useState } from "react";
import { Upload, Maximize, ChevronRight, X } from "react-feather";

import Options from "./OptionsSection";
import * as api from "../../helpers/apiActions";
import Input from "../../components/Input";
import ShowModal from "../../components/ShowModal";
import input from "../../images/matchstick-input.jpg";
import output from "../../images/matchstick-output.jpg";

import devices from "../../helpers/devices";

const FileUpload = () => (
  <div className="w-100 relative mb3 pb1">
    <div className="fw5 pb2">Upload your designs</div>
    <label
      htmlFor="file-upload"
      className="btn-upload flex items-center w-100 flex justify-center"
    >
      <Upload size={18} />
      <span className="ml2 mr2">Add file(s)</span>
    </label>
    <input type="file" id="file-upload" onChange={this.onFileUpload} />
    {Object.keys(upload).length > 0 && (
      <div className="f6 flex items-center mt1 pt1 w-100">
        <img
          src={upload.base64}
          style={{ width: "20px", height: "20px" }}
          className="br2 mh1"
        />
        <div className="ml2 w-100 mr4">{upload.name}</div>
        <div
          className="flex pointer"
          onClick={() => this.setState({ upload: {} })}
        >
          <X size={18} />
        </div>
      </div>
    )}
  </div>
);

class Form extends React.Component {
  state = {
    url: "",
    capture: "",
    upload: {},
    options: {},
    comparison: "",
    showModal: false,
    image1: "",
    image2: "",
    result: "",
  };

  setOptions = (options) => this.setState({ options: options });

  onSubmit = async (e) => {
    e.preventDefault();
    const { url, mockup, options } = this.state;
    if (url.length === 0) return;

    try {
      const { data } = await api.fetchComparison(url, mockup, options);
      const { image1, image2, result } = data;
      this.props.setResults({ image1, image2, result });
    } catch (error) {
      console.log(error);
    }
  };

  onFileUpload = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const info = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + " kB",
        base64: reader.result,
        file: file,
      };
      this.setState({ upload: info });
    };
  };

  render() {
    const { capture, upload, showModal } = this.state;

    return (
      <div className="mr4" style={{ width: "420px" }}>
        <form className="mb4 pb2" onSubmit={this.onSubmit}>
          <div className="w-100 mb3 pb1">
            <div className="fw5 pb2">Website link</div>
            <Input
              onChange={({ target }) => this.setState({ url: target.value })}
              placeholder="Enter your website link"
              className="b--silver"
            />
          </div>
          <div className="w-100 mb3 pb1">
            <div className="fw5 pb2">Mockup link</div>
            <Input
              onChange={({ target }) => this.setState({ mockup: target.value })}
              placeholder="Enter your mockup link"
              className="b--silver"
            />
          </div>
          <button
            onClick={this.onSubmit}
            className="btn btn-primary flex items-center flex justify-center mt3 ml-auto pointer"
            type="submit"
          >
            <span className="w-100 ml2 pl1">Submit</span>
            <ChevronRight width={24} />
          </button>
          <Options onChange={this.setOptions} />
        </form>
      </div>
    );
  }
}

const Results = ({ comparison, setShowModal }) => (
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
);

const FormSection = () => {
  const defaultImage = require("../../images/matchstick-comparison.jpg");
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState({});

  return (
    <div className="flex mb5 ph3">
      {showModal && (
        <ShowModal
          onDismiss={() => setShowModal(false)}
          image1={results.image1}
          image2={results.image2}
          result={results.result}
        />
      )}
      <Form setResults={setResults} />
      <Results
        comparison={results.result || defaultImage}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default FormSection;
