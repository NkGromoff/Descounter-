import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import mainRoutes from "./routes/mainRoutes";
import loginOrRegRoutes from "./routes/loginOrRegRoutes";
import { useDispatch, useSelector } from "react-redux";
import { auth, getGames } from "./redux/UserReduser";
import { setInitialazed } from "./redux/AppReduser";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.UserReduser.isAuth);
  const user = useSelector((state) => state.UserReduser.user);
  const init = useSelector((state) => state.AppReduser.init);
  useEffect(() => {
    dispatch(setInitialazed());
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(getGames("none", "none", [0, 9999], [1997, 2021], [], null, null, null, user.id));
    }
  }, [isAuth]);

  if (!init) return <div className="container loading">Загрузка...</div>;
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
