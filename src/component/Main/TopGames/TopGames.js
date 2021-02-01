import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGamesGenre } from "../../../redux/MainPageReduser";
import Banners from "./Banners";
import Genre from "./Genre";

function TopGames() {
  let games;
  const dispatch = useDispatch();
  let idArrayGameGenre = useSelector((state) => state.MainPageReduser.genreGames);
  let gamesGenre = useSelector((state) => state.MainPageReduser.genreGames);
  useEffect(() => {
    dispatch(getGamesGenre(["Экшен", "Инди", "Гонки", "Хоррор"]));
  }, []);
  if (gamesGenre)
    games = gamesGenre.map((g, key) => <Genre key={key} gamesArray={g.gamesForMainPage} title={g.genre} />);

  return (
    <>
      <div className="container">
        <Banners />
        {games}
      </div>
    </>
  );
}

export default TopGames;
