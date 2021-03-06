import React, { useState } from "react";
import { Upload, Maximize, ChevronRight, X, Loader } from "react-feather";
import cx from "classnames";

import * as api from "../../helpers/apiActions";
import isValidURL from "../../helpers/isValidURL";
import createFormData from "../../helpers/createFormData";
import Options from "./OptionsSection";
import LoadingView from "./LoadingView";
import ErrorView from "./ErrorView";
import ExampleView from "./ExampleView";
import Input from "../../components/Input";
import ShowModal from "../../components/ShowModal";

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

  validateInputs = () => {
    const { url, upload, options } = this.state;
    const fileSizeLimit = 50 * 1024 * 1024; // 50 MB
    let urlInputError = "";
    let uploadInputError = "";

    if (url.length === 0) {
      urlInputError = "Missing link";
    } else if (!isValidURL(url)) {
      urlInputError = "Invalid link";
    }
    if (Object.keys(upload).length === 0) {
      uploadInputError = "Missing mockup file";
    } else if (upload.size > fileSizeLimit) {
      uploadInputError = "File too large";
    }
    this.setState({ urlInputError, uploadInputError });
    return !urlInputError && !uploadInputError;
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { url, upload, options } = this.state;

    const isValid = this.validateInputs();
    if (!isValid) return;

    this.setState({ isLoading: true });
    this.props.setLoading(true);

    try {
      const formData = createFormData(url, upload, options);
      const response = await api.fetchComparison(formData);
      const { image1, image2, result } = response.data;
      this.props.setLoading(false);
      this.props.setResults({ image1, image2, result });
      this.props.setOptions({ options });
    } catch (error) {
      this.props.setLoading(false);
      const message =
        (error.response || {}).data || "Oops. Something went wrong.";
      this.props.setError({
        message: message,
        error: error,
      });
    }
  };

  onFileUpload = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    const file = files[0];
    const src = URL.createObjectURL(file);
    const img = new Image();
    img.src = src;

    img.onload = () => {
      const info = {
        name: file.name,
        type: file.type,
        size: file.size,
        file: file,
        src: src,
        image: img,
      };
      this.setState({ upload: info });
    };
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
            <div className="flex pb1">
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
                  accept="image/png"
                  onChange={this.onFileUpload}
                />
                {Object.keys(upload).length === 0 && (
                  <div className="f7 mt2 gray">
                    *Accepts .png less than 50 MB
                  </div>
                )}
                {Object.keys(upload).length > 0 && (
                  <div className="f6 flex items-center mt1 pt1">
                    <img
                      src={upload.src}
                      style={{
                        width: "20px",
                        height: "20px",
                        objectFit: "cover",
                      }}
                      className="br2 mh1"
                    />
                    <div
                      className="ml2 mr3 truncate"
                      style={{ maxWidth: "220px" }}
                    >
                      {upload.name}
                    </div>
                    <div
                      className="flex pointer ml-auto"
                      onClick={() => this.setState({ upload: {} })}
                    >
                      <X size={18} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              onClick={this.onSubmit}
              className={cx("btn btn-primary ph3 mt2 ml-auto", {
                pointer: !isLoading,
                loading: isLoading,
              })}
              disabled={isLoading}
            >
              <span className="ml2 mr1">Submit</span>
              {!isLoading ? (
                <ChevronRight width={18} />
              ) : (
                <Loader width={18} className="spin" />
              )}
            </button>
          </div>
          <Options file={this.state.upload} onChange={this.setOptions} />
        </form>
      </div>
    );
  }
}

const MaximizeButton = ({ onClick }) => (
  <div
    className="pointer bg-white absolute flex items-center justify-center shadow-5 top-2 right-2 ma4 br-100"
    style={{ width: "56px", height: "56px" }}
    onClick={onClick}
  >
    <Maximize />
  </div>
);

const Results = ({ isLoading, result, setShowModal, options }) => (
  <div
    className="bg-white ba b--near-white shadow-results center pa2 pa3-m pa4-l br3 relative w-100"
    style={{ minHeight: "420px" }}
  >
    {result ? (
      <img src={result} className={cx("result", { loading: isLoading })} />
    ) : (
      <ExampleView isLoading={isLoading} />
    )}
    {isLoading && <LoadingView />}
    <MaximizeButton onClick={() => setShowModal(true)} />
  </div>
);

const FormSection = () => {
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
        result={results.result}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default FormSection;
