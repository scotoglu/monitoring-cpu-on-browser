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
  //Fetchs working services
  fetchServices = () => {
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
        <Navbar />
        {/*container kaldırılırsa, table scrollable özelliği de kalkar. */}
        <div className="container">
          <div className="row float-right mt-2">
            <div className="col">
              <span>* bytes</span>
            </div>
          </div>
          <table className="table">
            <thead>
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
    );
  }
}

export default Services;
