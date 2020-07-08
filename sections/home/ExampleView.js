import React, { Component } from "react";
import cx from "classnames";

import input from "../../images/github-input.jpg";
import output from "../../images/github-output.jpg";
import comparison from "../../images/github-comparison.jpg";

const images = [input, output, comparison];

class ExampleView extends Component {
  state = { index: 0 };

  componentDidMount() {
    this.timer = setInterval(this.incrementIndex, 6000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  incrementIndex = () => {
    const { index } = this.state;
    const nextIndex = index < images.length - 1 ? index + 1 : 0;
    this.setState({ index: nextIndex });
  };

  render() {
    const { isLoading } = this.props;
    const { index } = this.state;

    return (
      <div className="examples relative">
        {images.map((img, key) => (
          <img
            key={key}
            src={img}
            className={cx("result", {
              loading: isLoading,
              active: index === key,
            })}
          />
        ))}
      </div>
    );
  }
}

export default ExampleView;
