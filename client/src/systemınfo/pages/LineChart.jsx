import React, { Component } from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

//Components
import Navbar from "../components/Navbar";

class LineChart extends Component {
  tempLoadForPass = [];
  start = "";
  constructor() {
    super();
    this.state = {
      data: [],
      startTime: null,
      labelCpuLoad: "",
      historyOfCpuload: []
    };
  }

  componentDidMount() {
    const startTime = new Date();
    this.start = Date.now();
    const time = 0;
    const num = 100;

    this.setState({ data: [{ time, num }], startTime });
    setInterval(this.getDatas, 2000);
  }

  getDatas = async () => {
    fetch("/api/currentLoad")
      .then(res => res.json())
      .then(data => {
        const actualTime = new Date();

        let num = data.currentload;
        let time = Math.round((actualTime - this.state.startTime) / 1000);

        let lblCpuLoad = data.currentload.toFixed(2);

        this.tempLoadForPass.push({ lblCpuLoad, time });

        //Adding last data to array and update state
        this.setState({
          historyOfCpuload: this.tempLoadForPass
        });

        //lblCpuLoad update only last data.
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
            <div className="col-md-3 mt-2 mr-2">
              <table
                className="table table-striped"
                style={{ width: "100px", border: "2px solid rgb(0,0,0,0.03)" }}
              >
                <thead className>
                  <tr>
                    <th>#</th>
                    <th>Load(%)</th>
                    <th>Time(s)</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.historyOfCpuload.length > 0
                    ? this.state.historyOfCpuload.map((load, index) => (
                        <tr>
                          <th>{index + 1}</th>
                          <th>{load.lblCpuLoad}</th>
                          <th>{load.time}</th>
                        </tr>
                      ))
                    : 0}
                </tbody>
              </table>
            </div>
            <div className="col-md-6 mt-2">
              <div className="card">
                <div className="card-header text-center">CPU Kulllanımı</div>
                <div className="card-body">
                  <VictoryChart width={800} height={800}>
                    <VictoryAxis dependentAxis />
                    {/*x-axis nasıl başlıycak .padStart 0:00/0/000 şeklik */}
                    <VictoryAxis
                      label="Time"
                      tickFormat={t =>
                        `${Math.floor(t / 60)}:${Math.round(t % 60)
                          .toString()
                          .padStart(2, "0")}`
                      }
                    />
                    {/*x ve y axislerinde hangi verilerin kullanılacağı */}
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
