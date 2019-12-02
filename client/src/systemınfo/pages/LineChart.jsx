import React, { Component } from "react";
import { VictoryLine, VictoryChart } from "victory";
//Logo
import CpuIcon from "../../assests/image/cpu.png";

class LineChart extends Component {
  dataLine = [];
  state = {
    cpuLoad: []
  };
  componentDidMount() {}

  render() {
    return (
      <div>
        <nav className="navbar navbar-success bg-success bg-lg text-white">
          <img src={CpuIcon} alt="" />
          <a href="/linechart">Cpu Kullanımı</a>
          <div className="row align-items-right"></div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <VictoryChart>
                <VictoryLine data={this.dataLine} />
              </VictoryChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LineChart;
