import React from "react";
import Banners from "./Banners";
import Genre from "./Genre";

function TopGames() {
  return (
    <>
      <Banners />
      <Genre name="Экшен" />
      <Genre name="RPG" />
      <Genre name="Инди" />
      <Genre name="Гонки" />
    </>
  );
}

export default TopGames;
