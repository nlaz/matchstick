import React, { Component } from "react";

class Modal extends Component {
  componentDidMount() {
    document.addEventListener("keyup", this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.onKeyUp);
  }

  onKeyUp = (e) => {
    if (e.keyCode === 27) {
      this.props.onDismiss();
    } else if (e.keyCode === 37) {
      this.props.onPrev();
    } else if (e.keyCode === 39) {
      this.props.onNext();
    }
  };

  render() {
    const { children } = this.props;
    return (
      <div className="bg-black-60 absolute top-0 bottom-0 left-0 right-0 z-999 ph2 pv4 ph4-m ph6-ns">
        <div className="ma4 bg-white ph2 ph4-ns pb4 pt3 relative br3 br5-ns center tc shadow-4">
          <div className="pa2">{children}</div>
        </div>
      </div>
    );
  }
}

export default Modal;
