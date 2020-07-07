import React, { Component } from "react";
import { Loader } from "react-feather";

const values = [
  "Sending internet packets...",
  "Downloading more frontend...",
  "Reinstalling MS Paint...",
  "Moving pixels more left...",
  "Moving pixels more right...",
  "Making buttons 10% rounder...",
  "Becoming a thought leader...",
  "Adding more gradients...",
  "Staring at a Post-it note...",
  "Making final final changes...",
  "Becoming a unicorn...",
  "Pushing to main branch...",
  "Congratulating a VC...",
  "Replacing margins with more padding...",
  "Replacing padding with more margin...",
  "Arguing with Design Twitter...",
  "Aligning text optically...",
  "Installing dark mode...",
  "Looking up CSS on StackOverflow...",
  "Alphabetizing stylesheets...",
  "Renaming Figma layers...",
  "Making pixel values more even...",
  "Aligning items to grid...",
  "Booting up terminal...",
];

class LoadingView extends Component {
  state = { value: values[0] };

  componentDidMount() {
    this.timer = setInterval(
      () =>
        this.setState({
          value: values[Math.floor(Math.random() * values.length)],
        }),
      4500
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div
        className="absolute flex justify-center near-black items-center right-0 left-0 ph2"
        style={{ top: "5.5rem" }}
      >
        <Loader size={16} className="spin" strokeWidth={3} />
        <div className="fw5 ml2">{this.state.value}</div>
      </div>
    );
  }
}

export default LoadingView;
