import React, { useState } from "react";
import { Upload, Maximize, X } from "react-feather";
import FileBase64 from "react-file-base64";

import Input from "../../components/Input";
import ShowModal from "../../components/ShowModal";
import input from "../../images/matchstick-input.jpg";
import output from "../../images/matchstick-output.jpg";
import comparison from "../../images/matchstick-comparison.jpg";

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

class Form extends React.Component {
  state = { capture: {}, upload: {}, showModal: false };

  setShowModal = val => this.setState({ showModal: val });

  onClick = () => {
    console.log("File inpute", this.fileInput);
    this.fileInput.trigger("click");
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
    console.log("Upload", upload);
    return (
      <div className="mr3" style={{ flex: 1 }}>
        {showModal && (
          <ShowModal
            onDismiss={() => this.setShowModal(false)}
            input={input}
            output={output}
            comparison={comparison}
          />
        )}
        <div className="flex items-end mb4 pb2">
          <div className="w-50 mr2">
            <div className="fw5 f6 pb2">Step 1: Share your website</div>
            <Input
              placeholder="Enter your website link"
              className="input-primary"
            />
          </div>
          <div className="w-25 mr2 relative">
            <div className="fw5 f6 pb1">Step 2: Upload your designs</div>
            <label
              htmlFor="file-upload"
              className="btn-upload flex items-center w-100 flex justify-center"
            >
              <Upload size={18} />
              <span className="ml2 mr2">Add file(s)</span>
            </label>
            <input type="file" id="file-upload" onChange={this.onFileUpload} />
            {Object.keys(upload).length > 0 && (
              <div className="f6 flex items-center absolute mt1 pv1 w-100">
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
          <button className="btn btn-primary flex items-center w-25 flex justify-center">
            <span className="ml2 ml2">Submit</span>
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
  }
}

const FormSection = () => (
  <div className="flex mb5">
    <Form />
    <Options />
  </div>
);

export default FormSection;
