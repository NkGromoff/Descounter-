import React from "react";
import { Route, Switch } from "react-router-dom";
import mainRoutes from "./routes/mainRoutes";
import loginOrRegRoutes from "./routes/loginOrRegRoutes";

function App() {
  return (
    <>
      <Switch>
        <Route path="/(Login|Registration)" component={loginOrRegRoutes} />
        <Route component={mainRoutes} />
      </Switch>
    </>
  );
}

export default App;
