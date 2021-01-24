import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import GamesDisplay from "../../shared/gamesDisplay";

function AllGames(props) {
  const games = useSelector((state) => state.AllGamesReduser.games);

  const [state, setState] = useState({
    years: "",
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
    props.getGames(
      state.filterPrice,
      state.filterNewDate,
      state.prices,
      state.years,
      state.genre,
      state.isDesc,
      null,
      state.term
    );
  }, [state.filterPrice, state.filterNewDate, state.genre, state.isDesc, state.years, state.prices, state.term]);

  useEffect(() => {
    let gameslength = props.games.length;
    let count = props.filter.count;
    if (state.isGamesMore == true && count && gameslength && gameslength < count.count) {
      props.getGamesMore(
        state.filterPrice,
        state.filterNewDate,
        state.prices,
        state.years,
        state.genre,
        state.isDesc,
        gameslength,
        count,
        state.term
      );
    }
  }, [state.isGamesMore, props.filter.count]);

  return <GamesDisplay childProps={childProps} games={games} />;
}

export default AllGames;
