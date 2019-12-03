import React, { Component } from "react";
import { VictoryPie } from "victory";

class Pie extends Component {
  constructor() {
    super();
    this.state = {
      memory: [],
      updateTime: 2000
    };

    this.getinputValue = this.getinputValue.bind(this);
    this.fetcMemoryUsage = this.fetcMemoryUsage.bind(this);
  }

  componentDidMount() {
    //Calls the method each interval miliseconds /*2000 miliseconds = 2 seconds */
    this.intervalId = setInterval(() => this.fetcMemoryUsage(), 2000);
  }

  fetcMemoryUsage = async () => {
    /*Altervative way  */
    // fetch("/api/mem")
    //   .then(res => res.json())
    //   .then(memory => {
    //     this.setState({ memory }, () =>
    //       console.log("Memory fetched...", memory)
    //     );
    //   });

    let res = await fetch("/api/mem");
    let memory = await res.json();
    this.setState({
      memory: memory
    });
  };

  //Calculate the percentage of free or used memory
  calcPercentage = bytes => {
    let total = this.state.memory.total;
    return (bytes / total) * 100;
  };

  //gets update time from input and update the state
  getinputValue = event => {
    if (event.key === "Enter") {
      // eslint-disable-next-line
      let time = event.target.value * 1000;
      // this.setState({
      //   updateTime: time
      // });
    }
    // console.log(this.state.updateTime);
  };
  render() {
    const isDataExist = this.state.memory.length !== 0 ? true : false;
    return (
      <div className="row justify-content-center">
        <div className="card mt-2" style={{ width: "30rem" }}>
          <div className="card-header text-center">
            <div className="row">
              <div className="col">
                <h6>Hafıza Kullanımı</h6>
              </div>
              {/* <div className="col">
                <input
                  placeholder=" Güncelleme Sıklığı"
                  type="text"
                  onKeyPress={this.getinputValue}
                ></input>
              </div> */}
            </div>
          </div>
          <div className="card-body">
            {isDataExist ? (
              <VictoryPie
                width={450}
                colorScale={["#eaaf79", "#bc3358"]}
                data={[
                  {
                    x:
                      "%" +
                      this.calcPercentage(this.state.memory.free).toFixed(2),
                    y: this.calcPercentage(this.state.memory.free)
                  },
                  {
                    x:
                      "%" +
                      this.calcPercentage(this.state.memory.used).toFixed(2),
                    y: this.calcPercentage(this.state.memory.used)
                  }
                ]}
              />
            ) : (
              "Yükleniyor..."
            )}
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col ">
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "#bc3358"
                  }}
                  id="used"
                >
                  <br />
                </div>
                <label htmlFor="used">
                  Kullanımda:
                  {" %" +
                    this.calcPercentage(this.state.memory.used).toFixed(2)}
                </label>
              </div>
              <div className="col">
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "#eaaf79"
                  }}
                  id="free"
                >
                  <br />
                </div>
                <label htmlFor="free">
                  Boşta:
                  {" %" +
                    this.calcPercentage(this.state.memory.free).toFixed(2)}
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col">
                Cpu Memory :
                {(this.state.memory.total * 9.31 * 0.0000000001).toFixed(2)} GB
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pie;
