import { Route } from "react-router-dom";
import Login from "../component/Main/Login/Login";
import Registration from "../component/Main/Registration/Registration";

function loginOrRegRoutes() {
  return (
    <>
      <Route path="/Login" component={Login} />
      <Route path="/Registration" component={Registration} />
    </>
  );
}

export default loginOrRegRoutes;
