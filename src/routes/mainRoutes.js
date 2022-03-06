import { Route, Switch } from "react-router-dom";
import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";
import About from "../component/Main/About/About";
import AllGames from "../component/Main/AllGames/AllGames";
import GamePage from "../component/Main/GamePage/GamePage";
import Profile from "../component/Main/profile/Profile";
import TopGames from "../component/Main/TopGames/TopGames";
import Congratulations from "../component/shared/Congratulations";
import NotFound from "../component/shared/NotFound";

function MainRoutes() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={TopGames} />
        <Route path="/GamePage/:id" component={GamePage} />
        <Route path="/AllGames" component={AllGames} />
        <Route path="/Agree" render={() => <About title="Соглашение" />} />
        <Route path="/About" render={() => <About title="О нас" />} />
        <Route path="/profile" component={Profile} />
        <Route exact path="/Registration/confirm" component={Congratulations} />
        <Route path="/Registration/confirm/:code" component={Congratulations} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default MainRoutes;
