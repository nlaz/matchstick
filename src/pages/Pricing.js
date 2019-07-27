import React from "react";

function Pricing() {
  return (
    <div className="bg-near-white">
      <div className="ph4 pt5 pb6 bg-white tc">
        <h1 className="f1 orange mb1">Pricing built for teams</h1>
        <p className="f4 measure-wide lh-copy mt0 mid-gray mb3 center">
          Get more out of Matchstick with automated features. Save your teams
          hours of design and development time with a Pro subscription today.
        </p>
      </div>
      <div className="bg-near-white center tc relative pb6">
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
            className="br4 bg-fire-gradient white ba b--near-white pa4 tc ml2"
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
          <div>
            <a
              className="f5 b ttu br2 bg-orange bn white no-underline mt3"
              style={{ padding: "12px 28px", fontSize: "14px" }}
              href="/"
            >
              Contact us
            </a>
          </div>
        </div>
        <div className="flex tl w-70 center mt5">
          <div className="w-100 pr3">
            <p className="b">What is a snapshot?</p>
            <p className="mid-gray lh-copy">
              A snapshot is a visual comparison of what you’ve built and what
              you’ve designed. Snapshots help you pinpoint what exactly is
              inaccurate with your implementation.
            </p>
          </div>
          <div className="w-100 ph3">
            <p className="b">What if I need more than 5,000 snapshots?</p>
            <p className="mid-gray lh-copy">
              If you run out of 5,000 snapshots, your workflow will continue to
              work as normal. We will charge you a small amount dependent on
              your additional usage.
            </p>
          </div>
          <div className="w-100 pl3">
            <p className="b">What browsers do you support?</p>
            <p className="mid-gray lh-copy">
              We have developed and tested the system to work on Chrome 77. If
              you are working with another browser, let us know which versions
              you need.
            </p>
          </div>
        </div>
        <div className="flex tl w-70 center mt4">
          <div className="w-100 pr3">
            <p className="b">How easy is upgrading?</p>
            <p className="mid-gray lh-copy">
              You can upgrade at any time by contacting us. Your upgraded plan
              will be activated by our team and will be automatically prorated
              up to the next billing cycle.
            </p>
          </div>
          <div className="w-100 ph3">
            <p className="b">Can I cancel my subscription?</p>
            <p className="mid-gray lh-copy">
              You can cancel at any time. We do not offer refunds of the
              remaining billing period.
            </p>
          </div>
          <div className="w-100" />
        </div>
      </div>
    </div>
  );
}

export default Pricing;
