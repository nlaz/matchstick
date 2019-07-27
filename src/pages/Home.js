import React, { Component } from "react";
import * as api from "../core/apiActions";
import * as qs from "query-string";

import Ticketing from "./Ticketing";

const baseUrl = process.env.REACT_APP_SERVER_URL;

const ViewCrop = ({ onClick }) => (
  <button onClick={onClick} className="absolute top-0 right-0 mr3 mt3">
    <img src={require("../target.svg")} height="14px" width="14px" />
  </button>
);

const ViewToggle = props => {
  return (
    <div className="toggle absolute top-0 right-0 mr3 mt3">
      <input
        className="checkbox"
        type="checkbox"
        id="toggle"
        checked={props.checked}
        onChange={props.onChange}
      />
      <label htmlFor="toggle" className="toggle" />
    </div>
  );
};
const DismissButton = ({ onClick }) => (
  <button
    className="bg-transparent bn f3 db mb1"
    onClick={onClick}
    style={{ marginLeft: "auto" }}
  >
    <img
      src={require("../dismiss.svg")}
      alt="Dismiss modal"
      height="20px"
      width="20px"
      style={{ opacity: 0.4 }}
    />
  </button>
);

const ShowInputModal = ({ results, onDismiss, image }) => (
  <div className="bg-black-60 absolute top-0 bottom-0 left-0 right-0 z-999">
    <div
      className="ma4 bg-white ph4 pb4 pt3 relative br2"
      style={{ boxShadow: "0 4px 8px rgba(0,0,0, .15)" }}
    >
      <DismissButton onClick={onDismiss} />
      <img className="ba b--light-gray" src={image} />
    </div>
  </div>
);

const ShowCompareModal = ({ onDismiss, image }) => (
  <div className="bg-black-60 absolute top-0 bottom-0 left-0 right-0 z-999">
    <div
      className="ma4 bg-white ph4 pb4 pt3 relative br2"
      style={{ boxShadow: "0 4px 8px rgba(0,0,0, .15)" }}
    >
      <DismissButton onClick={onDismiss} />
      <img className="ba b--light-gray" src={image} />
    </div>
  </div>
);

const LoadingView = () => (
  <div
    className="absolute absolute--fill bg-white pa4 tc"
    style={{ opacity: 0.8, zIndex: 99 }}
  >
    <span className="f4">Generating a snapshot for you. Loading...</span>
  </div>
);

class Home extends Component {
  state = {
    inputLink: "",
    outputLink: "",
    isLoading: false,
    results: {},
    toggleState: "input",
    isShowingInputModal: false,
    isShowingCompareModal: false
  };

  componentWillMount() {
    const { search } = this.props.location;

    const { input, output } = qs.parse(search);
    this.setState({ inputLink: input, outputLink: output });
  }

  changeInputUrl = e => {
    this.setState({ inputLink: e.target.value });
  };

  changeOutputUrl = e => {
    this.setState({ outputLink: e.target.value });
  };

  handleSubmit = async () => {
    const { inputLink, outputLink } = this.state;
    this.props.history.push({
      search: qs.stringify({ input: inputLink, output: outputLink })
    });
    this.setState({ isLoading: true });
    const response = await api.fetchReport(inputLink, outputLink);
    this.setState({ results: response.data, isLoading: false });
  };

  toggleState = () => {
    let nextState = this.state.toggleState === "input" ? "output" : "input";
    this.setState({ toggleState: nextState });
  };

  toggleCrop = () => {
    this.setState({ cropIsOpen: !this.state.cropIsOpen });
  };

  dismissInputModal = () => this.setState({ isShowingInputModal: false });

  dismissCompareModal = () => this.setState({ isShowingCompareModal: false });

  showInputModal = () => this.setState({ isShowingInputModal: true });

  showCompareModal = () => this.setState({ isShowingCompareModal: true });

  render() {
    const {
      inputLink,
      outputLink,
      results,
      isLoading,
      toggleState,
      isShowingInputModal,
      isShowingCompareModal
    } = this.state;
    return (
      <div>
        {isShowingInputModal && (
          <ShowInputModal
            onDismiss={this.dismissInputModal}
            image={
              Object.keys(results).length > 0
                ? `${baseUrl}${results[toggleState]}`
                : require("../images/google.png")
            }
          />
        )}
        {isShowingCompareModal && (
          <ShowCompareModal
            onDismiss={this.dismissCompareModal}
            image={
              Object.keys(results).length > 0
                ? `${baseUrl}${results.comparison}`
                : require("../images/comparison.png")
            }
          />
        )}
        {this.state.cropIsOpen && (
          <Ticketing
            baseUrl={baseUrl}
            results={results}
            toggleCrop={this.toggleCrop}
          />
        )}
        <div className="white ph4 pv3 mb3">
          <h1 className="f1 mv0">Design with Confidence.</h1>
          <p className="f4 b measure-wide lh-copy mt0 near-white mb3">
            Compare your designs with your live site to find the
            inconsistencies.
          </p>
        </div>

        <div className="bg-white br3 ph4 pv3 mh4 mb3">
          <div className="flex ph3 pv2">
            <div className="flex flex-column w-100">
              <label className="b mb2">
                Enter the public Invision link to your designs
              </label>
              <input
                value={inputLink}
                onChange={this.changeInputUrl}
                className="f5 br2 ba b--light-gray"
                placeholder="i.e. www.google.stage"
                style={{ padding: "12px 16px" }}
              />
            </div>
            <div className="flex w-100">
              <div className="flex flex-column w-100 ml2">
                <label className="b mb2">Enter the link to your website</label>
                <input
                  value={outputLink}
                  onChange={this.changeOutputUrl}
                  className="f5 br2 ba b--light-gray"
                  placeholder="i.e. www.google.com"
                  style={{ padding: "12px 16px" }}
                />
              </div>
              <div className="ml2 flex flex-column justify-end">
                <button
                  onClick={this.handleSubmit}
                  className="f5 br2 b bg-orange bn white"
                  style={{ padding: "13px 60px" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white br3 ph4 pv3 mh4 mb4">
          <div className="flex bg-white ph3 pv3 relative">
            {isLoading && <LoadingView />}
            <div className="w-100">
              <div className="b mb2">
                This is how your{" "}
                {toggleState === "input" ? "designs look." : "live site looks."}{" "}
              </div>
              <div className="w-100 mr2 relative" style={{ height: "600px" }}>
                <ViewToggle
                  onChange={this.toggleState}
                  checked={toggleState === "input"}
                />
                <img
                  alt=""
                  onClick={this.showInputModal}
                  className="ba bg--near-white b--light-gray w-100 pointer"
                  src={
                    Object.keys(results).length > 0
                      ? `${baseUrl}${results[toggleState]}`
                      : require("../images/google.png")
                  }
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    height: "100%"
                  }}
                />
              </div>
            </div>

            <div className="w-100">
              <div className="b mb2">This is how well it matches.</div>
              <div className="w-100 ml2 relative" style={{ height: "600px" }}>
                <ViewCrop onClick={this.toggleCrop} />
                <img
                  alt=""
                  onClick={this.showCompareModal}
                  className="ba bg--near-white b--light-gray w-100 pointer"
                  src={
                    Object.keys(results).length > 0
                      ? `${baseUrl}${results.comparison}`
                      : require("../images/comparison.png")
                  }
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    height: "100%"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
