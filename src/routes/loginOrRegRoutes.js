import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Login from "../component/Main/Login/Login";
import Profile from "../component/Main/profile/Profile";
import Registration from "../component/Main/Registration/Registration";

function LoginOrRegRoutes() {
  return (
    <>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Registration" component={Registration} />)
      </Switch>
    </>
  );
}

export default LoginOrRegRoutes;
