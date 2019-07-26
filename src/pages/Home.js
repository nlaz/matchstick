import React, { Component } from "react";
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
    inputLink: "http://www.google.com",
    outputLink: "http://matchstick.design/",
    isLoading: false
  };

  changeInputUrl = e => {
    this.setState({ inputLink: e.target.value });
  };

  changeOutputUrl = e => {
    this.setState({ outputLink: e.target.value });
  };

  handleSubmit = async () => {
    const { inputLink, outputLink } = this.state;
    this.setState({ isLoading: true });
    const response = await api.fetchReport(inputLink, outputLink);
    console.log(response);
    this.setState({ results: response.data, isLoading: false });
  };

  render() {
    const { inputLink, outputLink, results, isLoading } = this.state;
    return (
      <div>
        <div className="ph4 pv4">
          <h1 className="f1 orange mb1">Design with Confidence.</h1>
          <p className="f4 measure lh-copy mt0 mid-gray mb3">
            Automate your visual testing by comparing what you design with what
            you build.
          </p>
        </div>
        <div className="bg-near-white pv1 ph4 bt bb b--light-gray">
          <div className="flex">
            <div className="pv3 flex flex-column w-100">
              <label className="b mb2">
                Enter the Invision link to your designs
              </label>
              <input
                value={inputLink}
                onChange={this.changeInputUrl}
                className="f4 br2 ba b--moon-gray"
                placeholder="i.e. www.invisionapp.com"
                style={{ padding: "8px 16px" }}
              />
            </div>
            <div className="pv3 flex flex-column w-100 ml2">
              <label className="b mb2">Enter the link to your website</label>
              <input
                value={outputLink}
                onChange={this.changeOutputUrl}
                className="f4 br2 ba b--moon-gray"
                placeholder="i.e. www.google.com"
                style={{ padding: "8px 16px" }}
              />
            </div>
            <div className="ml2 flex flex-column justify-end pv3">
              <button
                onClick={this.handleSubmit}
                className="f4 br2 bg-orange bn white"
                style={{ padding: "9px 40px" }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="bg-near-white ph4 pv4 b--light-gray">
          <div className="flex bg-white pa3 relative">
            {isLoading && <LoadingView />}
            <div className="w-100 bg-moon-gray mr2" style={{ height: "600px" }}>
              {results && (
                <img
                  alt=""
                  className="ba b--light-gray"
                  src={`${baseUrl}${results.input}`}
                  style={{ objectFit: "cover", height: "100%" }}
                />
              )}
            </div>
            <div className="w-100 bg-moon-gray ml2" style={{ height: "600px" }}>
              {results && (
                <img
                  alt=""
                  className="ba b--light-gray"
                  src={`${baseUrl}${results.comparison}`}
                  style={{ objectFit: "cover", height: "100%" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
