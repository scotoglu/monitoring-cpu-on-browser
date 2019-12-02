import React, { Component } from "react";

//Components
import GraphicsInfo from "./components/GraphicsInfo";
import CpuInfo from "./components/CpuInfo";
import PieChart from "./components/PieChart";
import Navbar from "./components/Navbar";
import DiskInfo from "./components/DiskInfo";

class SystemInfo extends Component {
  cpuloadTemp = [];
  constructor(props) {
    super(props);
    this.fetcMemoryUsage = this.fetcMemoryUsage.bind(this);

    this.state = {
      graphics: [],
      cpu: [],
      memory: [],
      disk: []
    };
  }
  componentDidMount() {
    //every 3 seconds recall methods and updates the datas
    this.ıntervalId = setInterval(() => this.fetcMemoryUsage(), 2000);

    //Cpu ınformation
    fetch("/api/cpu")
      .then(res => res.json())
      .then(cpu => {
        this.setState({ cpu }, () =>
          console.log("Cpu information fetched...", cpu)
        );
      });

    //Graphics information
    fetch("/api/graphics")
      .then(res => res.json())
      .then(graphics => {
        this.setState({ graphics }, () =>
          console.log("Graphics info fetched...", graphics)
        );
      }); //Disk information
    fetch("/api/disk")
      .then(res => res.json())
      .then(disk => {
        this.setState({ disk }, () =>
          console.log("Disk info fetched...", disk)
        );
      });
  }

  //Fetchs memory usage
  fetcMemoryUsage = () => {
    fetch("/api/mem")
      .then(res => res.json())
      .then(memory => {
        this.setState({ memory }, () =>
          console.log("Memory fetched...", memory)
        );
      });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col-md-2 mt-2 ml-2">
            <CpuInfo
              title="CPU Bilgileri"
              manufacturer={this.state.cpu.manufacturer}
              brand={this.state.cpu.brand}
              totalMem={this.state.memory.total}
              speed={this.state.cpu.speed + " Ghz"}
            />
          </div>
          <div className="col-md-2 mt-2 ">
            <PieChart
              total={this.state.memory.total}
              used={this.state.memory.used}
              free={this.state.memory.free}
            />
          </div>
          <div className="col-md-4 mt-2">
            {/* <LineChart data={this.state.cpuLoad} /> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 ml-2">
            <GraphicsInfo data={this.state.graphics} />
          </div>
          <div className="col-md-2 mt-2">
            <DiskInfo data={this.state.disk} />
          </div>
        </div>
      </div>
    );
  }
}

export default SystemInfo;
