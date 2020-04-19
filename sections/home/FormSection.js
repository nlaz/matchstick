import React from "react";

import ResultsSection from "./ResultsSection";

const FormSection = () => (
  <div className="ba b--navy br3 mt5 pa4 mb5">
    <div className="flex flex-column flex-row-ns flex-column-m">
      <div className="w-100 mr2 mb3">
        <label className="db f6 fw5 mb1">
          Enter the public Invision link to your designs
        </label>
        <input
          className="input w-100 db pv2 ph3 bg-none ba b--navy br2 navy"
          placeholder="https://"
        />
      </div>
      <div className="w-100 flex mb3">
        <div className="w-100 mr2 ml1">
          <label className="db f6 fw5 mb1">
            Enter the link to your website
          </label>
          <input
            className="input w-100 db pv2 ph3 bg-none ba b--navy br2 navy"
            placeholder="https://"
          />
        </div>
        <div className="flex items-end ml1">
          <button className="ba b--navy ph3 pv2 bg-navy br2 gold">
            Submit
          </button>
        </div>
      </div>
    </div>
    <ResultsSection />
  </div>
);

export default FormSection;
