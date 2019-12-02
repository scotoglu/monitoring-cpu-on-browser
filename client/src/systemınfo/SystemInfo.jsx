import React, { Component } from "react";

//Components
import GraphicsInfo from "./components/GraphicsInfo";
import CpuInfo from "./components/CpuInfo";
import PieChart from "./components/PieChart";

//Logo
import CpuIcon from "../assests/image/cpu.png";
//import LineChart from "./pages/LineChart";

class SystemInfo extends Component {
  cpuloadTemp = [];
  constructor(props) {
    super(props);
    this.fetcMemoryUsage = this.fetcMemoryUsage.bind(this);
    this.fetchProcess = this.fetchProcess.bind(this);
    this.fetchCpuLoad = this.fetchCpuLoad.bind(this);
    this.state = {
      customers: [],
      graphics: [],
      cpu: [],
      memory: [],
      cpuLoad: []
    };
  }
  componentDidMount() {
    //every 3 seconds recall methods and updates the datas
    this.ıntervalId = setInterval(() => this.fetcMemoryUsage(), 2000);
    //this.ıntervalId = setInterval(() => this.fetchCpuLoad(), 2000);
    //this.ıntervalId = setInterval(() => this.fetchProcess(), 3000);
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
  }

  //Fetchs cpuload
  fetchCpuLoad = () => {
    fetch("/api/currentLoad")
      .then(res => res.json())
      .then(data => {
        this.cpuloadTemp.push(data.currentload);
      });
    this.setState({
      cpuLoad: this.cpuloadTemp
    });
  };
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
  //Working Services on pc
  fetchProcess = () => {
    fetch("/api/process")
      .then(res => res.json())
      .then(process => {
        this.setState({ process }, () =>
          console.log("Process fetched...", process)
        );
      });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-success bg-success bg-lg text-white">
          <img src={CpuIcon} alt="" />
          <a href="/lineChart">Cpu Kullanımı</a>
          <div className="row align-items-right">
            <div className="col"></div>
          </div>
        </nav>
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
        </div>
      </div>
    );
  }
}

export default SystemInfo;
