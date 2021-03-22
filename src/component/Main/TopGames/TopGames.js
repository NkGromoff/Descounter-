import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGamesGenre, setMainPageInitialazed } from "../../../redux/MainPageReduser";
import { Preloader } from "../../shared/Preloader";
import Banners from "./Banners";
import Genre from "./Genre";

function TopGames() {
  let games;
  const dispatch = useDispatch();
  let gamesGenre = useSelector((state) => state.MainPageReduser.genreGames);
  let init = useSelector((state) => state.MainPageReduser.initManPage);

  useEffect(() => {
    dispatch(setMainPageInitialazed(["Экшен", "Инди", "Гонки", "Хоррор"]));
  }, []);
  if (gamesGenre)
    games = gamesGenre.map((g, key) => <Genre key={key} gamesArray={g.gamesForMainPage} title={g.genre} />);
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
      </div>
    </>
  );
}

export default TopGames;
