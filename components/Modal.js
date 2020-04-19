import React, { Component } from "react";

class Modal extends Component {
  componentDidMount() {
    document.addEventListener("keyup", this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.onKeyUp);
  }

  onKeyUp = e => {
    if (e.keyCode === 27) {
      this.props.onDismiss();
    }
  };

  render() {
    const { children } = this.props;
    return (
      <div className="bg-black-60 absolute top-0 bottom-0 left-0 right-0 z-999">
        <div
          className="ma4 bg-white ph4 pb4 pt3 relative br3 center tc"
          style={{ boxShadow: "0 4px 8px rgba(0,0,0, .15)" }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
