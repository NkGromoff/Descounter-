import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import mainRoutes from "./routes/mainRoutes";
import loginOrRegRoutes from "./routes/loginOrRegRoutes";
import { useDispatch, useSelector } from "react-redux";
import { auth, getGames } from "./redux/UserReduser";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.UserReduser.isAuth);
  const user = useSelector((state) => state.UserReduser.user);
  useEffect(() => {
    dispatch(auth());
  }, []);
  useEffect(() => {
    if (isAuth) {
      dispatch(getGames("none", "none", [0, 9999], [1997, 2021], [], null, null, null, user.id));
    }
  }, [isAuth]);

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
