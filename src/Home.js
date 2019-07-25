import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="ph4 pv4">
          <h1 className="f1 orange mb1">Design with Confidence.</h1>
          <p className="f4 measure lh-copy mt0 mid-gray mb3">
            Automate your visual testing by comparing what you design with what
            you build.
          </p>
        </div>
        <div className="bg-light-gray pv1 ph4 bt bb b--moon-gray">
          <div className="flex">
            <div className="pv4 flex flex-column w-100">
              <label className="b mb2">Enter the link to your designs</label>
              <input
                className="f4 br2 ba b--moon-gray"
                placeholder="i.e. www.invisionapp.com"
                style={{ padding: "8px 20px" }}
              />
            </div>
            <div className="pv4 flex flex-column w-100 ml2">
              <label className="b mb2">Enter the link to your website</label>
              <input
                className="f4 br2 ba b--moon-gray"
                placeholder="i.e. www.google.com"
                style={{ padding: "8px 20px" }}
              />
            </div>
            <div className="ml2 flex flex-column justify-end pv4">
              <button
                className="f4 br2 bg-orange bn white"
                style={{ padding: "9px 40px" }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
