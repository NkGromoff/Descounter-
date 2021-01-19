import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import mainRoutes from "./routes/mainRoutes";
import loginOrRegRoutes from "./routes/loginOrRegRoutes";
import { useDispatch } from "react-redux";
import { auth } from "./redux/UserReduser";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(auth());
  }, []);
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
