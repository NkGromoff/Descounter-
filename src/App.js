import React from "react";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import TopGames from "./component/Main/TopGames/TopGames";
import Agree from "./component/Main/Agree/Agree";
import About from "./component/Main/About/About";
import AllGamesContainer from "./component/Main/AllGames/AllGamesContainer";
import { Route } from "react-router-dom";
import GamePageContainer from "./component/Main/GamePage/GamePageContainer";

function App() {
  return (
    <>
      <Header />
      <Route exact path="/" render={() => <TopGames />} />
      <Route path="/GamePage/:id" render={() => <GamePageContainer />} />
      <Route path="/AllGames" render={() => <AllGamesContainer />} />
      <Route path="/Agree" render={() => <Agree />} />
      <Route path="/About" render={() => <About />} />
      <Footer />
    </>
  );
}

export default App;
