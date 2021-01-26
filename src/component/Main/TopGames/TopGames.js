import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGamesGenre } from "../../../redux/MainPageReduser";
import MainCarts from "./mainCarts";
import Banners from "./Banners";

function TopGames() {
  const dispatch = useDispatch();
  let idArrayGameGenre = useSelector((state) => state.MainPageReduser.genreGames);
  useEffect(() => {
    dispatch(getGamesGenre(["Экшен", "Инди", "Гонки", "Хоррор"]));
  }, []);

  return (
    <>
      <Banners />
    </>
  );
}

export default TopGames;
