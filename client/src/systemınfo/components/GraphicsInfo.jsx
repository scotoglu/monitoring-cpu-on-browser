import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const GraphicsInfo = props => {
  const isDataExist = props.data.length > 0 ? true : false;

  return (
    <div className="card" style={{ width: " 16rem" }}>
      <div className="card-header text-center">
        <h6>Grafik İşlemci</h6>
      </div>
      <div className="card-body mb-0">
        {isDataExist
          ? props.data.map((data, index) => (
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Üretici: {data.vendor}</li>
                <li className="list-group-item">Model: {data.model}</li>
              </ul>
            ))
          : "Yükleniyor..."}
      </div>
      <div className="card-footer">
        <hr />
      </div>
    </div>
  );
};
export default GraphicsInfo;
