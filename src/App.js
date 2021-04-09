import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import MainRoutes from "./routes/mainRoutes";
import LoginOrRegRoutes from "./routes/loginOrRegRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "./redux/UserReduser";
import { setInitialazed } from "./redux/AppReduser";
import { Preloader } from "./component/shared/Preloader";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.UserReduser.isAuth);
  const user = useSelector((state) => state.UserReduser.user);
  const init = useSelector((state) => state.AppReduser.init);

  useEffect(() => {
    ReactGA.initialize("UA-192339483-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
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
      <Helmet>
        <title>Descounter - лучшие скидки на игры</title>
        <meta name="description" content={`Descounter – является агрегатором цен и скидок на игры представленные в магазинах. Цены обновляются в
    несколько раз в сутки Каждая игра снабжена подробным описанием, системными требованиями и лучшими
    ценами."`} />
        <meta name="keywords" content={`Сравнение цен, каталог игр, цены на игры, стоимость игр, купить игру, игры`} />
      </Helmet>
      <Switch>
        <Route path="/Login" component={LoginOrRegRoutes} />
        <Route exact path="/Registration" component={LoginOrRegRoutes} />

        <Route component={MainRoutes} />
      </Switch>
    </>
  );
}

export default App;
