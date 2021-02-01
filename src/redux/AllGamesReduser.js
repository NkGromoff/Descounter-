import { gamesAPI } from "../api/api";

const Get_Games_Reduser = "All_Games_Reduser_Get_Games";
const Get_Games_Filter = "Get_Games_Filter";
const Get_Games_More_Reduser = "Get_Games_More_Reduser";
const Set_Genre_Games = "Set_Genre_Games";

let initialState = {
  games: [],
  genre: [],
  filter: {
    price: null,
    date: null,
    prices: null,
    dateRange: null,
    genre: null,
    isDesc: null,
    count: null,
    term: null,
  },
};

const AllGamesReduser = (state = initialState, action) => {
  switch (action.type) {
    case Get_Games_Reduser:
      return { ...state, games: action.data };
    case Get_Games_More_Reduser:
      return { ...state, games: [...state.games, ...action.data] };
    case Get_Games_Filter:
      return { ...state, filter: action.filter };
    case Set_Genre_Games:
      return { ...state, genre: action.data };

    default:
      return state;
  }
};

export const GetGamesReduserCreator = (data) => ({
  type: Get_Games_Reduser,
  data: data,
});

export const GetGamesMoreReduserCreator = (data) => ({
  type: Get_Games_More_Reduser,
  data: data,
});

export const SetGenreGames = (data) => ({
  type: Set_Genre_Games,
  data: data,
});

export const SetGamesFilter = (price, date, prices, dateRange, genre, isDesc, count, term) => ({
  type: Get_Games_Filter,
  filter: {
    price,
    date,
    prices,
    dateRange,
    genre,
    isDesc,
    count,
    term,
  },
});

export const getGames = (price, date, prices, dateRange, genre, isDesc, games, term) => async (dispatch) => {
  try {
    let response = await gamesAPI.getGames(price, date, prices, dateRange, genre, isDesc, games, term);
    dispatch(GetGamesReduserCreator(response.data));
    response = await gamesAPI.getCountGames(price, date, prices, dateRange, genre, isDesc, games, term);
    dispatch(SetGamesFilter(price, date, prices, dateRange, genre, isDesc, ...response.data, term));
  } catch (err) {}
};

export const getGamesMoreList = (price, date, prices, dateRange, genre, isDesc, games, count, term) => async (
  dispatch
) => {
  try {
    dispatch(SetGamesFilter(price, date, prices, dateRange, genre, isDesc, count, term));
    let response = await gamesAPI.getGames(price, date, prices, dateRange, genre, isDesc, games, term);

    dispatch(GetGamesMoreReduserCreator(response.data));
  } catch (err) {}
};

export const getGameGenre = () => async (dispatch) => {
  try {
    let response = await gamesAPI.getAllGenre();
    dispatch(SetGenreGames(response.data));
  } catch (err) {}
};

export default AllGamesReduser;
