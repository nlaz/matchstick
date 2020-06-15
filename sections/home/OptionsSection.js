import React, { useState } from "react";

import Select from "../../components/Select";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
import devices from "../../helpers/devices";

const defaultState = {
  emulateDevice: "",
  orientation: "",
  width: 1080,
  height: 3080,
  fullPage: true,
};

class OptionsSection extends React.Component {
  state = defaultState;

  onDeviceChange = ({ target }) => {
    const device = devices.filter((d) => d.name === target.value)[0];
    this.setState(
      {
        emulateDevice: device.name,
        width: device.width,
        height: device.height,
      },
      () => this.props.onChange(this.state)
    );
  };

  onOrientationChange = ({ target }) =>
    this.setState({ orientation: target.value }, () =>
      this.props.onChange(this.state)
    );

  onWidthChange = ({ target }) =>
    this.setState({ width: target.value }, () =>
      this.props.onChange(this.props)
    );

  onHeightChange = ({ target }) =>
    this.setState({ height: target.value }, () =>
      this.props.onChange(this.state)
    );

  onFullPageChange = () =>
    this.setState({ fullPage: !this.state.fullPage }, () =>
      this.props.onChange(this.state)
    );

  onReset = () => this.setState(defaultState);

  render() {
    const { showOptions } = this.state;
    return (
      <div>
        <div className="flex justify-between items-center mt5">
          <div className="f4 fw5">Options</div>
          <div
            onClick={this.onReset}
            className="silver b--moon-gray ph1 pointer f7 ba br2 ph2 pv1"
          >
            Reset
          </div>
        </div>
        <div>
          <div className="mb2 pb1 mt3 pt2">
            <label className="f6 db mid-gray mb2">Device</label>
            <Select
              placeholder="Select your Device"
              onChange={this.onDeviceChange}
              value={this.state.emulateDevice}
            >
              {devices.map((device, key) => (
                <Select.Option key={key}>{device.name}</Select.Option>
              ))}
            </Select>
          </div>
          <div className="mb2 pb1 pt2">
            <label className="f6 db mid-gray mb2">Orientation</label>
            <Select
              placeholder="Select Orientation"
              onChange={this.onOrientationChange}
              value={this.state.orientation}
            >
              <Select.Option>Vertical</Select.Option>
              <Select.Option>Horizontal</Select.Option>
            </Select>
          </div>
          <div className="mb3 pb1 pt2 flex">
            <div className="w-100 mr2">
              <label className="f6 db mid-gray mb2">Width</label>
              <Input
                className="input-pixel"
                onChange={this.onWidthChange}
                value={this.state.width}
              />
            </div>
            <div className="w-100 ml2">
              <label className="f6 db mid-gray mb2">Height</label>
              <Input
                className="input-pixel"
                onChange={this.onHeightChange}
                value={this.state.height}
              />
            </div>
          </div>
          <div className="mb3 pb1 pt2">
            <Checkbox
              id="capture"
              checked={this.state.fullPage}
              onChange={this.onFullPageChange}
            />
            <label htmlFor="capture">Compare full page</label>
          </div>
        </div>
      </div>
    );
  }
}

export default OptionsSection;
