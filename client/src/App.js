import React from "react";
import SystemInfo from "./systemınfo/SystemInfo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LineChart from "./systemınfo/pages/LineChart";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={SystemInfo}></Route>
          <Route exact path="/linechart" component={LineChart}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
