import React from "react";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import TopGames from "./component/Main/TopGames/TopGames";
import Agree from "./component/Main/Agree/Agree";
import About from "./component/Main/About/About";
import GamePage from "./component/Main/GamePage/GamePage";
import AllGames from "./component/Main/AllGames/AllGames";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Route exact path="/" render={() => <TopGames />} />
        <Route path="/GamePage" render={() => <GamePage />} />
        <Route path="/AllGames" render={() => <AllGames />} />
        <Route path="/Agree" render={() => <Agree />} />
        <Route path="/About" render={() => <About />} />
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
