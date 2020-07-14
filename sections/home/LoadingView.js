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
  "Staring blankly at a Post-it note...",
  "Making final final changes...",
  "Becoming a mythical unicorn...",
  "Pushing to main branch...",
  "Congratulating a VC...",
  "Replacing margins with more padding...",
  "Replacing padding with more margin...",
  "Arguing with Design Twitter...",
  "Aligning text optically...",
  "Installing dark mode...",
  "Alphabetizing stylesheets...",
  "Capitalizing Figma layers...",
  "Making pixel values more even...",
  "Booting up hacker terminal...",
  "Frantically searching StackOverflow...",
  "Making buttons with more pop...",
  "Adding more drop shadows...",
  "Competing in a design sprint...",
  "Drafting a moodboard...",
  "Launching a newsletter on ProductHunt...",
  "Circling back with Product Manager...",
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
        className="absolute tc near-black items-center right-0 left-0 ph2"
        style={{ top: "7.5rem" }}
      >
        <div class="loadingio-spinner-spin-wrapper">
          <div class="spinner-spin">
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="f5 fw5 ml2">{this.state.value}</div>
      </div>
    );
  }
}

export default LoadingView;
