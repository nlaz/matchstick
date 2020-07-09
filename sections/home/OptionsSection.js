import React, { useState } from "react";
import cx from "classnames";
import { ChevronDown, ChevronUp } from "react-feather";

import Select from "../../components/Select";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
import devices from "../../helpers/devices";

const defaultState = {
  emulateDevice: "Custom - Use mockup dimensions",
  orientation: "horizontal",
  width: "-",
  height: "-",
  color: "#ff03ff",
  fullPage: false,
  showOptions: false,
  file: {},
};

class OptionsSection extends React.Component {
  state = defaultState;

  onColorChange = ({ target }) =>
    this.setState({ color: target.value }, () =>
      this.props.onChange(this.state)
    );

  onDeviceChange = ({ target }) => {
    const device = devices[target.value];
    this.setState({ emulateDevice: target.value }, () =>
      this.onUpdateDimensions()
    );
  };

  onOrientationChange = ({ target }) =>
    this.setState({ orientation: target.value }, () =>
      this.onUpdateDimensions(this.state)
    );

  onUpdateDimensions = () => {
    const { file } = this.props;
    const { emulateDevice, orientation } = this.state;
    const device = devices[emulateDevice];
    let width, height;

    if (
      emulateDevice === "Custom - Use mockup dimensions" &&
      Object.keys(file).length > 0
    ) {
      width = file.image.width;
      height = file.image.height;
    } else {
      width = device[orientation].width;
      height = device[orientation].height;
    }

    this.setState({ width, height }, () => this.props.onChange(this.state));
  };

  onFullPageChange = () =>
    this.setState({ fullPage: !this.state.fullPage }, () =>
      this.onUpdateDimensions()
    );

  onReset = (e) => {
    e.stopPropagation();
    this.setState({ ...defaultState, showOptions: this.state.showOptions });
  };

  componentDidMount = () => this.props.onChange(this.state);

  componentDidUpdate = (prevProps, prevState) => {
    const { file } = this.props;
    if (file !== prevProps.file) {
      this.onUpdateDimensions();
    }
  };

  toggleShowOptions = () =>
    this.setState({ showOptions: !this.state.showOptions });

  render() {
    const { showOptions } = this.state;
    return (
      <div className="ba mt4 mb3 mt5-l br3 b--moon-gray bg-white">
        <div
          className="flex justify-between items-center ph3 pv2 pointer br3"
          onClick={this.toggleShowOptions}
        >
          <div className="f5 fw5 w-100">Options</div>
          <div
            onClick={this.onReset}
            className="dark-gray hover-b--mid-gray b--moon-gray ph1 pointer f7 ba br2 ph2 pv1"
          >
            Reset
          </div>
          <div className="pointer ml2 pv1 mt1" onClick={this.toggleShowOptions}>
            {showOptions ? <ChevronUp /> : <ChevronDown />}
          </div>
        </div>
        {showOptions && (
          <div className="ph3 pv2 mh1 br3">
            <div className="mb2 pb1 mt3">
              <label className="f6 db mid-gray mb2">Device</label>
              <Select
                placeholder="Select your Device"
                onChange={this.onDeviceChange}
                value={this.state.emulateDevice}
                className="b--silver "
              >
                {Object.keys(devices).map((device) => (
                  <Select.Option key={device} value={device}>
                    {device}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="mb2 pb2 pt2">
              <label className="f6 db mid-gray mb2">Orientation</label>
              <Select
                placeholder="Select Orientation"
                onChange={this.onOrientationChange}
                value={this.state.orientation}
                className="b--silver"
              >
                <Select.Option value="horizontal">Horizontal</Select.Option>
                <Select.Option value="vertical">Vertical</Select.Option>
              </Select>
            </div>
            <div className="mb3 pb1 pt3 mt1 flex">
              <div className="w-100 mr2">
                <label className="f6 db mid-gray mb2">Width</label>
                <div className="bb pv2">{this.state.width}</div>
              </div>
              <div className="w-100 ml2">
                <label className="f6 db mid-gray mb2">Height</label>
                <div className="bb pv2">
                  {this.state.fullPage ? "∞" : this.state.height}
                </div>
              </div>
            </div>
            <div className="mb3 pb3 pt2">
              <label className="f6 db mid-gray mb2">Color</label>
              <div className="flex">
                <Input
                  value={this.state.color}
                  onChange={this.onColorChange}
                  placeholder="#000000"
                />
                <div
                  className="br3 ml2"
                  style={{
                    width: "44px",
                    height: "40px",
                    flex: "1 0 auto",
                    backgroundColor: this.state.color,
                  }}
                />
              </div>
            </div>
            <div className="mb3 mt3 pb2">
              <Checkbox
                id="capture"
                checked={this.state.fullPage}
                onChange={this.onFullPageChange}
              />
              <label htmlFor="capture" className="ml2">
                Compare full page
              </label>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default OptionsSection;
