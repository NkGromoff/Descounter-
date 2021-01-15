import { Route, Switch } from "react-router-dom";
import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";
import About from "../component/Main/About/About";
import Agree from "../component/Main/Agree/Agree";
import AllGamesContainer from "../component/Main/AllGames/AllGamesContainer";
import GamePageContainer from "../component/Main/GamePage/GamePageContainer";
import TopGames from "../component/Main/TopGames/TopGames";
import NotFound from "../component/NotFound/NotFound";

function mainRoutes() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <TopGames />} />
        <Route path="/GamePage/:id" render={() => <GamePageContainer />} />
        <Route path="/AllGames" render={() => <AllGamesContainer />} />
        <Route path="/Agree" render={() => <Agree />} />
        <Route path="/About" render={() => <About />} />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
      <Footer />
    </>
  );
}

export default mainRoutes;
