import * as React from "react";
import * as d3 from "d3";

//eslint-disable-next-line
import { VictoryPie } from "victory";
const calcPercentage = (bytes, total) => {
  return (bytes / total) * 100;
};
const PieChart = props => {
  const height = 200;
  const width = 200;
  let total = props.total;
  let used = calcPercentage(props.used, total).toFixed(2);
  let free = calcPercentage(props.free, total).toFixed(2);

  // const pieData = [
  //   { x: free, y: free },
  //   { x: used, y: used }
  // ];

  const data = [free, used];
  let pie = d3.pie()(data);

  return (
    <div className="card" style={{ width: " 16rem" }}>
      <div className="card-header text-center">
        <h6>Hafıza Kullanımı</h6>
      </div>
      <div className="card-body">
        <svg height={height} width={width}>
          <g transform={`translate(${width / 2},${height / 2})`}>
            <Slice pie={pie} />
            <text x={-60}>%{used}</text>
            <text x={10}>%{free}</text>
          </g>
        </svg>
        {/* <VictoryPie data={pieData} colorScale={["#eaaf79", "#bc3358"]} /> */}
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col ">
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
            <label htmlFor="free">Boşta</label>
          </div>
          <div className="col">
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
            <label htmlFor="used">Kullanımda</label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PieChart;

const Slice = props => {
  let { pie } = props;

  let arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(100);

  let interpolate = d3.interpolateRgb("#eaaf79", "#bc3358");
  //Return the num of color to display pies
  return pie.map((slice, index) => {
    let sliceColor = interpolate(index / (pie.length - 1));

    return <path d={arc(slice)} fill={sliceColor} />;
  });
};
