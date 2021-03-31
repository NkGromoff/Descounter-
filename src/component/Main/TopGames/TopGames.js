import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setMainPageInitialazed } from "../../../redux/MainPageReduser";
import { Genre } from "../../shared/Genre";
import { Preloader } from "../../shared/Preloader";
import Banners from "./Banners";
import GenreDispaly from "./Genre";

function TopGames() {
  let games;
  const dispatch = useDispatch();
  let gamesGenre = useSelector((state) => state.MainPageReduser.genreGames);
  let init = useSelector((state) => state.MainPageReduser.initManPage);
  const userSettings = useSelector((state) => state.UserReduser.userSettings);
  const isAuth = useSelector((state) => state.UserReduser.isAuth);
  const genre = useSelector((state) => state.AppReduser.genre);
  const history = useHistory();
  const [isShow, setIsShow] = useState(false);
  let genreItem = null;
  useEffect(() => {
    if (isAuth) dispatch(setMainPageInitialazed(userSettings.userMenu));
    else dispatch(setMainPageInitialazed(["Экшен", "Инди", "Гонки", "Хоррор"]));
  }, [isAuth, userSettings]);
  if (gamesGenre)
    games = gamesGenre.map((g, key) => <GenreDispaly key={key} gamesArray={g.gamesForMainPage} title={g.genre} />);
  if (genre) {
    genreItem = genre.map((i) => (
      <Genre key={i.id} id={i.id} name={i.name} genre={genre} userGenre={userSettings.userMenu} />
    ));
  }
  const openMenu = () => {
    if (isAuth) setIsShow((prev) => !prev);
    else return history.push("/Login");
  };
  return (
    <>
      {!init ? (
        <div className="container loading">
          <Preloader />
        </div>
      ) : (
        ``
      )}
      <div className={`container ${!init ? `hiddeOpacity` : ``} `}>
        <Banners />
        {games}

        <button onClick={openMenu} className="gameGallery__changeGenre">
          +
        </button>
        <div className="gameGallery__changeMenu">
          <div className={`gameGallery__mainWrapper ${isShow ? "gameGallery__mainWrapper--active" : ""}`}>
            <h2 className="gameGallery__title">Выберете жанры</h2>
            <div className="gameGallery__genreWrapper">{genreItem}</div>
            <button onClick={openMenu} className="gameGallery__closeButon"></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopGames;
