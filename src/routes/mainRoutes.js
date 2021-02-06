import { Route, Switch } from "react-router-dom";
import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";
import About from "../component/Main/About/About";
import Agree from "../component/Main/Agree/Agree";
import AllGamesContainer from "../component/Main/AllGames/AllGamesContainer";
import GamePageContainer from "../component/Main/GamePage/GamePageContainer";
import Profile from "../component/Main/profile/Profile";
import TopGames from "../component/Main/TopGames/TopGames";
import NotFound from "../component/NotFound/NotFound";
import Congratulations from "../component/shared/Congratulations";

function MainRoutes() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={TopGames} />
        <Route path="/GamePage/:id" component={GamePageContainer} />
        <Route path="/AllGames" component={AllGamesContainer} />
        <Route path="/Agree" component={Agree} />
        <Route path="/About" component={About} />
        <Route path="/profile" component={Profile} />
        <Route path="/Congratulations" component={Congratulations} />
        <Route path="*" component={NotFound} />
      </Switch>

      <Footer />
    </>
  );
}

export default MainRoutes;
