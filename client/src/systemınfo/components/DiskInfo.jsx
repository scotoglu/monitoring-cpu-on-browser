import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const DiskInfo = props => {
  const data = props.data[0];

  const isDataExist = props.data.length > 0 ? true : false;
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-header text-center">
        <h6>Disk Bilgileri</h6>
      </div>
      <div className="card-body">
        {isDataExist ? (
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Disk: {data.name}</li>
            <li className="list-group-item">Type: {data.type}</li>
            <li className="list-group-item">
              Size: {(data.size * 9.31 * 0.0000000001).toFixed(2)} GB
            </li>
          </ul>
        ) : (
          "Yükleniyor..."
        )}
      </div>
      <div className="card-footer">
        <hr></hr>
      </div>
    </div>
  );
};
export default DiskInfo;
