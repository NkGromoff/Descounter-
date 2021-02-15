import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGamesGenre } from "../../../redux/MainPageReduser";
import { Preloader } from "../../shared/Preloader";
import Banners from "./Banners";
import Genre from "./Genre";

function TopGames() {
  let games;
  const dispatch = useDispatch();
  let gamesGenre = useSelector((state) => state.MainPageReduser.genreGames);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getGamesGenre(["Экшен", "Инди", "Гонки", "Хоррор"]));
    setTimeout(() => setLoading(false), 700);
  }, []);
  if (gamesGenre)
    games = gamesGenre.map((g, key) => <Genre key={key} gamesArray={g.gamesForMainPage} title={g.genre} />);

  return (
    <>
      {loading ? (
        <div className="container loading">
          <Preloader />
        </div>
      ) : (
        ``
      )}
      <div className={`container ${loading ? `hiddeOpacity` : ``} `}>
        <Banners />
        {games}
      </div>
    </>
  );
}

export default TopGames;
