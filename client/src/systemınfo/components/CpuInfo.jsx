import React from "react";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const CpuInfo = props => {
  const isDataExist = props.manufacturer ? true : false;
  return (
    <div className="card" style={{ width: " 16rem" }}>
      <div className="card-header text-center">
        <h6>{props.title}</h6>
      </div>
      <div className="card-body">
        {isDataExist ? (
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Üretici: {props.manufacturer}</li>
            <li className="list-group-item">Model: {props.brand}</li>
            <li className="list-group-item">İşlemci: {props.speed}</li>
            <li className="list-group-item">
              Hafıza: {(props.totalMem * 9.31 * 0.0000000001).toFixed(2)} GB
            </li>
          </ul>
        ) : (
          "Yükleniyor..."
        )}
      </div>
      <div className="card-footer">
        <hr />
      </div>
    </div>
  );
};
export default CpuInfo;
