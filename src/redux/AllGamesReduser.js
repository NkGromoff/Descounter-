import { gamesAPI } from "../api/gamesAPI";

const Get_Games_Reduser = "All_Games_Reduser_Get_Games";
const Get_Games_Filter = "Get_Games_Filter";
const Get_Games_More_Reduser = "Get_Games_More_Reduser";
const Set_Genre_Games = "Set_Genre_Games";
const Toggle_Is_Fetching = "Toggle_Is_Fetching";

let initialState = {
  isFetching: false,
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
    case Toggle_Is_Fetching:
      return { ...state, isFetching: action.isFetching };

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

export const toggleFetching = (isFetching) => ({
  type: Toggle_Is_Fetching,
  isFetching: isFetching,
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
    await dispatch(toggleFetching(true));
    let data = await gamesAPI.getGames(price, date, prices, dateRange, genre, isDesc, games, term);
    dispatch(GetGamesReduserCreator(data.games));
    dispatch(SetGamesFilter(price, date, prices, dateRange, genre, isDesc, data.gamesCount, term));
    dispatch(toggleFetching(false));
  } catch (err) {}
};

export const getGamesMoreList = (price, date, prices, dateRange, genre, isDesc, games, count, term) => async (
  dispatch
) => {
  try {
    dispatch(toggleFetching(true));
    dispatch(SetGamesFilter(price, date, prices, dateRange, genre, isDesc, count, term));
    let data = await gamesAPI.getGames(price, date, prices, dateRange, genre, isDesc, games, term);
    dispatch(GetGamesMoreReduserCreator(data.games));
    dispatch(toggleFetching(false));
  } catch (err) {}
};

export const getGameGenre = () => async (dispatch) => {
  try {
    let data = await gamesAPI.getAllGenre();
    dispatch(SetGenreGames(data));
  } catch (err) {}
};

export default AllGamesReduser;
