import React, { useState } from "react";
import { Upload, Maximize, ChevronRight, X, Loader } from "react-feather";
import cx from "classnames";

import * as api from "../../helpers/apiActions";
import Options from "./OptionsSection";
import LoadingView from "./LoadingView";
import ErrorView from "./ErrorView";
import Input from "../../components/Input";
import ShowModal from "../../components/ShowModal";
import input from "../../images/matchstick-input.jpg";
import output from "../../images/matchstick-output.jpg";

import devices from "../../helpers/devices";

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
    urlInputError: "",
    uploadInputError: "",
  };

  setOptions = (options) => this.setState({ options: options });

  onSubmit = async (e) => {
    e.preventDefault();
    const { url, upload, options } = this.state;
    if (url.length === 0) {
      return this.setState({ urlInputError: "Link missing" });
    }
    if (Object.keys(upload).length === 0) {
      return this.setState({ uploadInputError: "Mockup missing" });
    }

    this.setState({ isLoading: true, urlInputError: "", uploadInputError: "" });
    this.props.setLoading(true);

    try {
      const response = await api.fetchComparison(url, upload, options);
      const { image1, image2, result } = response.data;
      this.props.setLoading(false);
      this.props.setResults({ image1, image2, result });
      this.props.setOptions({ options });
    } catch (error) {
      this.props.setLoading(false);
      if (error.response === 400) {
        this.props.setError({
          message: error.response.data,
          error: error,
        });
      } else {
        this.props.setError({
          message: "Something happened...",
          error: error,
        });
      }
    }
  };

  onFileUpload = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    const info = {
      name: file.name,
      type: file.type,
      size: Math.round(file.size / 1000) + " kB",
      data: formData,
      file: URL.createObjectURL(file),
    };
    this.setState({ upload: info });
  };

  render() {
    const { isLoading } = this.props;
    const { capture, upload, showModal } = this.state;

    return (
      <div className="sidebar mr4 w-100">
        <form
          className="mb4 pb2"
          onSubmit={this.onSubmit}
          encType="multipart/form-data"
        >
          <div className="w-100 mb3 pb1">
            <div className="flex justify-between items-center pb2">
              <div className="fw5">Website link</div>
              {this.state.urlInputError && (
                <div className="f6 fw6 red shake">
                  *{this.state.urlInputError}
                </div>
              )}
            </div>
            <Input
              onChange={({ target }) => this.setState({ url: target.value })}
              placeholder="Paste your link, https://github.com"
              className="b--black"
            />
          </div>
          <div className="w-100 relative mb3 pb1">
            <div className="flex justify-between items-center pb2">
              <div className="fw5">Upload your designs</div>
              {this.state.uploadInputError && (
                <div className="f6 fw6 red shake">
                  *{this.state.uploadInputError}
                </div>
              )}
            </div>
            <div className="flex">
              <div className="relative" style={{ flex: "1 auto" }}>
                <label
                  htmlFor="file-upload"
                  className="btn-upload flex items-center flex justify-center"
                >
                  <Upload size={18} />
                  <span className="ml2 mr2">Add file(s)</span>
                </label>
                <input
                  type="file"
                  id="file-upload"
                  onChange={this.onFileUpload}
                />
                {Object.keys(upload).length > 0 && (
                  <div className="f6 flex items-center mt1 pt1">
                    <img
                      src={upload.file}
                      style={{ width: "20px", height: "20px" }}
                      className="br2 mh1"
                    />
                    <div
                      className="ml2 mr4 truncate"
                      style={{ maxWidth: "220px" }}
                    >
                      {upload.name}
                    </div>
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
                type="submit"
                onClick={this.onSubmit}
                className={cx("btn btn-primary ml2", {
                  pointer: !isLoading,
                  loading: isLoading,
                })}
                disabled={isLoading}
              >
                {!isLoading ? (
                  <ChevronRight width={24} />
                ) : (
                  <Loader width={20} className="spin" />
                )}
              </button>
            </div>
          </div>
          <Options onChange={this.setOptions} />
        </form>
      </div>
    );
  }
}

const Results = ({ isLoading, comparison, setShowModal, options }) => (
  <div className="bg-white shadow-4 center pa4 br3 relative w-100">
    <img src={comparison} className={cx("results", { loading: isLoading })} />
    {isLoading && <LoadingView />}
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
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [error, setError] = useState({});
  const [options, setOptions] = useState({});

  return (
    <div className="flex flex-column flex-row-l mb5 ph3-ns">
      {Object.keys(error).length > 0 && (
        <ErrorView error={error} onDismiss={() => setError({})} />
      )}
      {showModal && (
        <ShowModal
          onDismiss={() => setShowModal(false)}
          image1={results.image1}
          image2={results.image2}
          result={results.result}
        />
      )}
      <Form
        setResults={setResults}
        setOptions={setOptions}
        setLoading={setLoading}
        setError={setError}
        isLoading={isLoading}
      />
      <Results
        isLoading={isLoading}
        options={options}
        comparison={results.result || defaultImage}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default FormSection;
