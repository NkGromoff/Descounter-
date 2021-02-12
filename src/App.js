import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import MainRoutes from "./routes/mainRoutes";
import LoginOrRegRoutes from "./routes/loginOrRegRoutes";
import { useDispatch, useSelector } from "react-redux";
import { auth, getGames, SetUsersMainGenre } from "./redux/UserReduser";
import { setInitialazed } from "./redux/AppReduser";
import { Preloader } from "./component/shared/Preloader";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.UserReduser.isAuth);
  const user = useSelector((state) => state.UserReduser.user);
  const init = useSelector((state) => state.AppReduser.init);
  const games = useSelector((state) => state.UserReduser.games);

  useEffect(() => {
    dispatch(setInitialazed());
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(getGames("none", "none", [0, 9999], [1997, 2021], [], null, null, null, user.id));
    }
  }, [isAuth]);
  if (!init)
    return (
      <div className="container loading">
        <Preloader />
      </div>
    );
  return (
    <>
      <Switch>
        <Route path="/Login" component={LoginOrRegRoutes} />
        <Route path="/Registration" component={LoginOrRegRoutes} />
        <Route component={MainRoutes} />
      </Switch>
    </>
  );
}

export default App;
