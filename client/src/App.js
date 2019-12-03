import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SystemInfo from "./systemınfo/SystemInfo";
import Services from "./systemınfo/pages/Services";
import LineChart from "./systemınfo/pages/LineChart";
import MemoryUsage from "./systemınfo/pages/MemoryUsage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SystemInfo}></Route>
          <Route exact path="/linechart" component={LineChart}></Route>
          <Route exact path="/services" component={Services}></Route>
          <Route exact path="/memory" component={MemoryUsage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
