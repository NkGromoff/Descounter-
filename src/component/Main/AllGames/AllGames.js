import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, getGamesMoreList } from "../../../redux/AllGamesReduser";

import GamesDisplay from "../../shared/gamesDisplay";

function AllGames(props) {
  const dispatch = useDispatch();

  const games = useSelector((state) => state.AllGamesReduser.games);

  const filter = useSelector((state) => state.AllGamesReduser.filter);

  const [state, setState] = useState({
    years: 0,
    prices: "",
    filterPrice: "",
    filterNewDate: "",
    isDesc: false,
    genre: [],
    isGamesMore: false,
    term: null,
  });
  const childProps = (years, prices, filterPrice, filterNewDate, isDesc, genre, isGamesMore, term) => {
    setState({
      years: years,
      prices: prices,
      filterPrice: filterPrice,
      filterNewDate: filterNewDate,
      isDesc: isDesc,
      genre: genre,
      isGamesMore: isGamesMore,
      term: term,
    });
  };

  useEffect(() => {
    if (state.years !== 0)
      dispatch(
        getGames(
          state.filterPrice,
          state.filterNewDate,
          state.prices,
          state.years,
          state.genre,
          state.isDesc,
          null,
          state.term
        )
      );
  }, [state.filterPrice, state.filterNewDate, state.genre, state.isDesc, state.years, state.prices, state.term]);

  useEffect(() => {
    let gameslength = games.length;
    let count = filter.count;
    if (state.isGamesMore == true && count && gameslength && gameslength < +count) {
      dispatch(
        getGamesMoreList(
          state.filterPrice,
          state.filterNewDate,
          state.prices,
          state.years,
          state.genre,
          state.isDesc,
          gameslength,
          count,
          state.term
        )
      );
    }
  }, [state.isGamesMore, filter.count]);

  return <GamesDisplay childProps={childProps} games={games} />;
}

export default AllGames;
