import { gamesAPI } from "../api/api";

const Get_Games_Reduser = "All_Games_Reduser_Get_Games";
const Get_Games_Filter = "Get_Games_Filter";
const Get_Games_More_Reduser = "Get_Games_More_Reduser";

let initialState = {
  games: [],
  filter: {
    price: null,
    date: null,
    leftPrice: null,
    rightPrice: null,
    dateRange: null,
    genre: null,
    isDesc: null,
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

export const SetGamesFilter = (
  price,
  date,
  leftPrice,
  rightPrice,
  dateRange,
  genre,
  isDesc
) => ({
  type: Get_Games_Filter,
  filter: { price, date, leftPrice, rightPrice, dateRange, genre, isDesc },
});

export const getGames = (
  price,
  date,
  leftPrice,
  rightPrice,
  dateRange,
  genre,
  isDesc,
  games
) => async (dispatch) => {
  try {
    dispatch(
      SetGamesFilter(price, date, leftPrice, rightPrice, dateRange, genre)
    );
    let response = await gamesAPI.getGames(
      price,
      date,
      leftPrice,
      rightPrice,
      dateRange,
      genre,
      isDesc,
      games
    );
    dispatch(GetGamesReduserCreator(response.data));
  } catch (err) {}
};

export const getGamesMoreList = (
  price,
  date,
  leftPrice,
  rightPrice,
  dateRange,
  genre,
  isDesc,
  games
) => async (dispatch) => {
  try {
    dispatch(
      SetGamesFilter(price, date, leftPrice, rightPrice, dateRange, genre)
    );
    let response = await gamesAPI.getGames(
      price,
      date,
      leftPrice,
      rightPrice,
      genre,
      isDesc,
      games
    );
    dispatch(GetGamesMoreReduserCreator(response.data));
  } catch (err) {}
};

export default AllGamesReduser;
