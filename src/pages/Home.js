import React, { Component } from "react";
import * as qs from "query-string";
import * as api from "../core/apiActions";

const baseUrl = process.env.REACT_APP_SERVER_URL;

const LoadingView = () => (
  <div
    className="absolute absolute--fill bg-white pa4 tc"
    style={{ opacity: 0.8 }}
  >
    <span className="f4">Generating a snapshot for you. Loading...</span>
  </div>
);

class Home extends Component {
  state = {
    inputLink: "",
    outputLink: "",
    isLoading: false
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

  render() {
    const { inputLink, outputLink, results, isLoading } = this.state;
    return (
      <div>
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
                Enter the Invision link to your designs
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

        <div className="bg-white br3 ph4 pv4 mh4 mb4">
          <div className="flex bg-white pa3 relative">
            {isLoading && <LoadingView />}
            <div className="w-100 bg-moon-gray mr2" style={{ height: "600px" }}>
              <img
                alt=""
                className="ba b--light-gray w-100"
                src={
                  results
                    ? `${baseUrl}${results.input}`
                    : require("../images/google.png")
                }
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                  height: "100%"
                }}
              />
            </div>
            <div className="w-100 bg-moon-gray ml2" style={{ height: "600px" }}>
              <img
                alt=""
                className="ba b--light-gray w-100"
                src={
                  results
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
    );
  }
}

export default Home;
