import React from "react";

function Pricing() {
  return (
    <div className="bg-near-white" style={{ height: "100vh" }}>
      <div className="ph4 pt5 pb6 bg-white tc">
        <h1 className="f1 orange mb1">Pricing built for teams</h1>
        <p className="f4 measure-wide lh-copy mt0 mid-gray mb3 center">
          Get more out of Matchstick with automated features. Save your teams
          hours of design and development time with a Pro subscription today.
        </p>
      </div>
      <div className="bg-near-white center tc relative">
        <div
          className="flex items-center justify-center absolute"
          style={{ top: "-80px", left: 0, right: 0 }}
        >
          <div
            className="br4 bg-white ba b--near-white pa4 tc mr2"
            style={{ width: "300px", boxShadow: "0 5px 30px rgba(0,0,0,.05)" }}
          >
            <h2 className="mb3 mt0">Monthly</h2>
            <div className="mb4">
              <span className="f1">$50</span>
              <span>/mo</span>
            </div>
            <div className="mid-gray tc">Up to 5,000 snapshots</div>
            <div className="mid-gray tc mb3">billed yearly</div>
          </div>
          <div
            className="br4 bg-orange white ba b--near-white pa4 tc ml2"
            style={{ width: "300px", boxShadow: "0 5px 30px rgba(0,0,0,.05)" }}
          >
            <h2 className="mb3 mt0">Yearly</h2>
            <div className="mb4">
              <span className="f1">$45</span>
              <span>/mo</span>
            </div>
            <div className="tc">Up to 5,000 snapshots</div>
            <div className="tc mb3">billed yearly</div>
          </div>
        </div>
        <div className="pt6">
          <p className="mt5 mb4 f5 lh-copy measure mid-gray center inline-block">
            Reach out to us and we will get you set up with a Pro account today.
            Upgrade your account today.
          </p>
          <a
            className="f5 b ttu br2 bg-orange bn white no-underline"
            style={{ padding: "12px 28px" }}
            href="/"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
