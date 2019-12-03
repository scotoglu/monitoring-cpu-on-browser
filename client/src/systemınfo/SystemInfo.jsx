import React, { Component } from "react";

//Components
import GraphicsInfo from "./components/GraphicsInfo";
import CpuInfo from "./components/CpuInfo";
//eslint-disable-next-line
import PieChart from "./components/PieChart";
import Navbar from "./components/Navbar";
import DiskInfo from "./components/DiskInfo";

class SystemInfo extends Component {
  cpuloadTemp = [];
  constructor(props) {
    super(props);

    this.state = {
      graphics: [],
      cpu: [],
      disk: []
    };
  }
  async componentDidMount() {
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
      });

    //Disk information
    fetch("/api/disk")
      .then(res => res.json())
      .then(disk => {
        this.setState({ disk }, () =>
          console.log("Disk info fetched...", disk)
        );
      });
    /*Alternatif way to above codes using async/await structure */
    // let resGraphics = await fetch("/api/graphics");
    // let graphics = await resGraphics.json();
    // this.setState({ graphics: graphics });

    //   let resDisk = await fetch("/api/disk");
    //   let disk = await resDisk.json();
    //   this.setState({ disk: disk });

    // let resCpu = await fetch("/api/cpu");
    // let cpu = await resCpu.json();
    // this.setState({ cpu: cpu });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="row justify-content-center">
          <h3>Donanım Bilgileri</h3>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-2 mt-2 ml-2">
            <CpuInfo
              title="CPU Bilgileri"
              manufacturer={this.state.cpu.manufacturer}
              brand={this.state.cpu.brand}
              speed={this.state.cpu.speed + " Ghz"}
            />
          </div>
          <div className="col-md-2 ml-2 mt-2">
            <GraphicsInfo data={this.state.graphics} />
          </div>
          <div className="col-md-2 mt-2 mt-2">
            <DiskInfo data={this.state.disk} />
          </div>
        </div>
      </div>
    );
  }
}

export default SystemInfo;
