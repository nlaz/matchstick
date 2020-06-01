import React, { useState } from "react";
import { Upload, Maximize, ChevronRight, X } from "react-feather";
import FileBase64 from "react-file-base64";

import Input from "../../components/Input";
import ShowModal from "../../components/ShowModal";
import input from "../../images/matchstick-input.jpg";
import output from "../../images/matchstick-output.jpg";
import comparison from "../../images/matchstick-comparison.jpg";

const Options = () => {
  const [showOptions, setShowOptions] = useState(true);

  return (
    <div>
      <div className="flex justify-between items-center mt5">
        <div className="f4 fw5">Options</div>
        <div className="silver b--moon-gray ph1 pointer f7 ba br2 ph2 pv1">
          Reset
        </div>
      </div>
      {showOptions && (
        <div>
          <div className="mb3 pb1 mt3 pt2">
            <label className="f6 db mid-gray mb2">Orientation</label>
            <Input defaultValue="Vertical" />
          </div>
          <div className="mb3 pb1 flex">
            <div className="w-100 mr2">
              <label className="f6 db mid-gray mb2">Width</label>
              <Input defaultValue="1080px" />
            </div>
            <div className="w-100 ml2">
              <label className="f6 db mid-gray mb2">Height</label>
              <Input defaultValue="3080px" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

class Form extends React.Component {
  state = { url: "", capture: {}, upload: {}, showModal: false };

  setShowModal = val => this.setState({ showModal: val });

  onSubmit = () => {
    const { url } = this.state;
    if (url.length === 0) return false;

    fetch(`/api/capture?url=${url}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ capture: data.image });
      });
  };

  onFileUpload = e => {
    const files = e.target.files;
    if (files.length === 0) return false;
    const file = files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const info = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + " kB",
        base64: reader.result,
        file: file
      };
      this.setState({ upload: info });
    };
  };

  render() {
    const { upload, showModal } = this.state;
    return (
      <div className="mr4" style={{ width: "420px" }}>
        {showModal && (
          <ShowModal
            onDismiss={() => this.setShowModal(false)}
            input={input}
            output={output}
            comparison={comparison}
          />
        )}
        <div className="mb4 pb2">
          <div className="w-100 mb3 pb1">
            <div className="fw5 pb2">Website link</div>
            <Input
              onChange={({ target }) => this.setState({ url: target.value })}
              placeholder="Enter your website link"
            />
          </div>
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
          <button
            onClick={this.onSubmit}
            className="btn btn-primary flex items-center flex justify-center mt3 ml-auto pointer"
          >
            <span className="w-100 ml2 pl1">Submit</span>
            <ChevronRight width={24} />
          </button>
          <Options />
        </div>
      </div>
    );
  }
}

const Results = ({ setShowModal }) => (
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
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex mb5 ph3">
      <Form />
      <Results setShowModal={setShowModal} />
    </div>
  );
};

export default FormSection;
