import React, { Component } from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

//Components
import Navbar from "../components/Navbar";

class LineChart extends Component {
  cpuloadTemp = [];
  constructor() {
    super();
    this.state = {
      data: [],
      startTime: null,
      labelCpuLoad: ""
    };
  }
  componentDidMount() {
    const startTime = new Date();
    const time = 0;
    const num = 100;

    this.setState({ data: [{ time, num }], startTime });
    setInterval(this.getDatas, 2000);
  }
  getDatas = () => {
    fetch("/api/currentLoad")
      .then(res => res.json())
      .then(data => {
        const actualTime = new Date();
        let num = data.currentload;
        let time = Math.round((actualTime - this.state.startTime) / 1000);
        let lblCpuLoad = data.currentload.toFixed(2);
        console.log(lblCpuLoad);

        this.setState({
          data: [...this.state.data, { time, num }],
          labelCpuLoad: lblCpuLoad
        });
      });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 mt-3">
              <div className="card">
                <div className="card-header text-center">CPU Kulllanımı</div>
                <div className="card-body">
                  <VictoryChart width={800} height={800}>
                    <VictoryAxis dependentAxis />
                    {/*x-axis nasıl başlıycak .padStart 0:00/0/000 şeklik */}
                    <VictoryAxis
                      tickFormat={t =>
                        `${Math.floor(t / 60)}:${Math.round(t % 60)
                          .toString()
                          .padStart(2, "0")}`
                      }
                    />
                    {/*x ve y axisleri hangi verilerin kullanılacağı */}
                    <VictoryLine
                      style={{
                        data: { stroke: "lime" }
                      }}
                      data={this.state.data}
                      x="time"
                      y="num"
                    />
                  </VictoryChart>
                </div>
                <div className="card-footer">
                  Cpu: {this.state.labelCpuLoad}% kullanımda.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LineChart;
