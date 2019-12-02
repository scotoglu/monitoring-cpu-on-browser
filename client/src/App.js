import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SystemInfo from "./systemınfo/SystemInfo";
import Services from "./systemınfo/pages/Services";
import LineChart from "./systemınfo/pages/LineChart";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={SystemInfo}></Route>
          <Route exact path="/linechart" component={LineChart}></Route>
          <Route exa path="/services" component={Services}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
