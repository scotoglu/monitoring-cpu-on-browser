import React, { Component } from "react";
//components
import Navbar from "../components/Navbar";
//css
import "../../assests/css/table.css";
class Services extends Component {
  constructor() {
    super();
    this.fetchServices = this.fetchServices.bind(this);
    this.state = {
      process: []
    };
  }
  componentDidMount() {
    this.ıntervalId = setInterval(() => this.fetchServices(), 2000);
  }
  //Fetchs all services
  fetchServices = async () => {
    let res = await fetch("/api/process");
    let process = await res.json();
    this.setState({ process }, () =>
      console.log("Process fetched...", process)
    );
  };
  render() {
    return (
      <div>
        <Navbar />

        <div>
          <div className="row mt-2">
            <div className="col-md-2 ml-2">
              <span>* bytes</span>
              <br />
              <span>Service Sayısı: {this.state.process.length}</span>
            </div>

            <div className="col-md-9">
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Pid</th>
                    <th scope="col">Cpu Usage*</th>
                    <th scope="col">Memory Usage*</th>
                    <th scope="col">Start Time</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.process.length
                    ? this.state.process.map((service, index) => (
                        <tr>
                          <th scope="row">{index}</th>
                          <th>{service.name}</th>
                          <th>{service.pid}</th>
                          <th>{service.pcpu.toFixed(9)}</th>
                          <th>{service.pmem.toFixed(9)}</th>
                          <th>{service.started}</th>
                        </tr>
                      ))
                    : "Yükleniyor..."}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Services;
