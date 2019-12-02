import React, { Component } from "react";

class Timer extends Component {
  state = {
    minutes: 0,
    seconds: 0
  };
  render() {
    return <div style={{ width: "40px" }}>{this.state.minutes}</div>;
  }
}

export default Timer;
