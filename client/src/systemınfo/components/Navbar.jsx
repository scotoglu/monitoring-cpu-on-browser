import React from "react";
//logo
import CpuIcon from "../../assests/image/cpu.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a href="/">
        <img src={CpuIcon} alt=""></img>
      </a>
      <div className="collapse navbar-collapse ">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/linechart">
              Cpu Kullanımı
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/services">
              Servisler
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/memory">
              Hafıza Kullanımı
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
