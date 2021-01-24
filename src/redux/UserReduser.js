import { userAPI } from "../api/api";
import { Redirect, useHistory } from "react-router-dom";
const Set_Is_Auth_And_User = "Set_Is_Auth_And_User";
const Set_Logout = "Set_Logout";

const Get_Proflile_Games_Reduser = "Get_Proflile_Games_Reduser";
const Set_Profile_Games_Filter = "Set_Profile_Games_Filter";
const Set_Reg_Error_Reduser = "Set_Reg_Error_Reduser";
const Set_Null_Error_Reduser = "Set_Null_Error_Reduser";
const Set_Login_Error_Reduser = "Set_Login_Error_Reduser";

let initialState = {
  user: {},
  games: null,
  isAuth: false,
  errorLogReg: null,
  errorLogLogin: null,
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

const UserReduser = (state = initialState, action) => {
  switch (action.type) {
    case Set_Is_Auth_And_User:
      return { ...state, user: action.data, isAuth: action.isAuth };
    case Set_Logout:
      return { ...state, user: {}, isAuth: false };
    case Get_Proflile_Games_Reduser:
      return { ...state, games: action.data };
    case Set_Profile_Games_Filter:
      return { ...state, filter: action.filter };
    case Set_Reg_Error_Reduser:
      return { ...state, errorLogReg: action.error };
    case Set_Login_Error_Reduser:
      return { ...state, errorLogLogin: action.error };
    case Set_Null_Error_Reduser:
      return { ...state, errorLogLogin: null, errorLogReg: null };
    default:
      return state;
  }
};

export const setIsAuthAndUser = (data, isAuth) => ({
  type: Set_Is_Auth_And_User,
  isAuth: isAuth,
  data: data,
});

export const setLogout = () => ({
  type: Set_Logout,
});

export const GetProfileGamesReduserCreator = (data) => ({
  type: Get_Proflile_Games_Reduser,
  data: data,
});

export const SetRegErrorReduserCreator = (error) => ({
  type: Set_Reg_Error_Reduser,
  error: error,
});

export const SetLoginErrorReduserCreator = (error) => ({
  type: Set_Login_Error_Reduser,
  error: error,
});

export const SetNullErrorLohReduserCreator = () => ({
  type: Set_Null_Error_Reduser,
});

export const SetLoginProfileGamesFilter = (price, date, prices, dateRange, genre, isDesc, count, term) => ({
  type: Set_Profile_Games_Filter,
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

export const setUser = (login, email, password, passwordTwo) => async (dispatch) => {
  try {
    let response = await userAPI.setUser(login, email, password, passwordTwo);
  } catch (err) {
    if (err.response.status != 200) {
      dispatch(SetRegErrorReduserCreator(err.response.data.message));
    }
  }
};

export const login = (login, password) => async (dispatch) => {
  try {
    let response = await userAPI.login(login, password);
    if (response.status == 200) {
      localStorage.setItem("token", response.data.token);
      dispatch(setIsAuthAndUser(response.data.user, true));
    }
  } catch (err) {
    if (err.response.status != 200) {
      dispatch(SetLoginErrorReduserCreator(err.response.data.message));
    }
  }
};

export const auth = () => async (dispatch) => {
  try {
    let response = await userAPI.auth();
    if (response.status == 200) {
      localStorage.setItem("token", response.data.token);
      dispatch(setIsAuthAndUser(response.data.user, true));
    } else {
      localStorage.removeItem("token");
    }
  } catch (err) {
    localStorage.removeItem("token");
  }
};

export const getGames = (price, date, prices, dateRange, genre, isDesc, games, term, id) => async (dispatch) => {
  try {
    let response = await userAPI.getGames(price, date, prices, dateRange, genre, isDesc, games, term, id);
    dispatch(GetProfileGamesReduserCreator(response.data));

    response = await userAPI.getCountGames(price, date, prices, dateRange, genre, isDesc, games, term, id);
    dispatch(Set_Profile_Games_Filter(price, date, prices, dateRange, genre, isDesc, ...response.data, term));
  } catch (err) {}
};

export const setGamesForUser = (userId, gameId) => async (dispatch) => {
  try {
    let response = await userAPI.setGameForUser(userId, gameId);
    dispatch(GetProfileGamesReduserCreator(response.data));
  } catch (err) {}
};

export default UserReduser;
