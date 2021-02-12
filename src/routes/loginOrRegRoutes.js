import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../component/Main/Login/Login";
import Registration from "../component/Main/Registration/Registration";
import TopGames from "../component/Main/TopGames/TopGames";

function LoginOrRegRoutes() {
  const isAuth = useSelector((state) => state.UserReduser.isAuth);
  return (
    <>
      {!isAuth ? (
        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/Registration" component={Registration} />)
        </Switch>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default LoginOrRegRoutes;
