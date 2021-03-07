import { useHistory } from "react-router-dom";
import { userAPI } from "../api/userAPI";
import { toggleFetching } from "./AllGamesReduser";

const Set_Is_Auth_And_User = "Set_Is_Auth_And_User";
const Set_Logout = "Set_Logout";
const Get_Proflile_Games_Reduser = "Get_Proflile_Games_Reduser";
const Set_Profile_Games_Filter = "Set_Profile_Games_Filter";
const Set_Reg_Error_Reduser = "Set_Reg_Error_Reduser";
const Set_Null_Error_Reduser = "Set_Null_Error_Reduser";
const Set_Login_Error_Reduser = "Set_Login_Error_Reduser";
const Get_Users_Games_More = "Get_Users_Games_More";
const Set_Users_Main_Genre = "Set_Users_Main_Genre";
const Set_Users_All_Count = "Set_Users_All_Count";
const Set_Proflile_GamesWithoutFilte_Reduser = "Set_Proflile_GamesWithoutFilte_Reduser";

let initialState = {
  user: {},
  games: [],
  gamesWithoutFilter: [],
  isAuth: false,
  mainGenre: "Отсутствует",
  allCount: null,
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
    case Set_Proflile_GamesWithoutFilte_Reduser:
      return { ...state, gamesWithoutFilter: action.data };
    case Set_Profile_Games_Filter:
      return { ...state, filter: action.filter };
    case Set_Reg_Error_Reduser:
      return { ...state, errorLogReg: action.error };
    case Set_Login_Error_Reduser:
      return { ...state, errorLogLogin: action.error };
    case Set_Null_Error_Reduser:
      return { ...state, errorLogLogin: null, errorLogReg: null };
    case Get_Users_Games_More:
      return { ...state, games: [...state.games, ...action.data] };
    case Set_Users_Main_Genre:
      return { ...state, mainGenre: action.data };
    case Set_Users_All_Count:
      return { ...state, allCount: action.data };
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

export const SetProflileGamesWithoutFilteReduser = (data) => ({
  type: Set_Proflile_GamesWithoutFilte_Reduser,
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

export const SetUsersMainGenre = (data) => ({
  type: Set_Users_Main_Genre,
  data: data,
});

export const SetUsersAllCount = (data) => ({
  type: Set_Users_All_Count,
  data: data,
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

export const GetGamesMoreAC = (data) => ({
  type: Get_Users_Games_More,
  data: data,
});

export const setUser = (login, email, password, passwordTwo) => async (dispatch) => {
  try {
    let response = await userAPI.setUser(login, email, password, passwordTwo);
    if (response.status == 200) window.location.href = "http://localhost:3000";
  } catch (err) {
    if (err.response.status !== 200) {
      dispatch(SetRegErrorReduserCreator(err.response.data.message));
    }
  }
};

export const login = (login, password, isRemember) => async (dispatch) => {
  try {
    let response = await userAPI.login(login, password, isRemember);
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
      dispatch(setIsAuthAndUser(response.data.user, true));
      localStorage.setItem("token", response.data.token);
    } else {
      localStorage.removeItem("token");
    }
  } catch (err) {
    console.log(err);
  }
};

export const getGames = (price, date, prices, dateRange, genre, isDesc, games, term, id) => async (dispatch) => {
  try {
    dispatch(toggleFetching(true));
    let data = await userAPI.getGames(price, date, prices, dateRange, genre, isDesc, games, term, id);
    dispatch(GetProfileGamesReduserCreator(data.games));
    dispatch(SetProflileGamesWithoutFilteReduser(data.allGames));
    dispatch(SetUsersAllCount(data.allGamesCount));
    dispatch(SetLoginProfileGamesFilter(price, date, prices, dateRange, genre, isDesc, data.gamesCountFilter, term));
    dispatch(toggleFetching(false));
  } catch (err) {}
};

export const getGamesUserMore = (price, date, prices, dateRange, genre, isDesc, games, count, term, id) => async (
  dispatch
) => {
  try {
    dispatch(toggleFetching(true));
    let data = await userAPI.getGames(price, date, prices, dateRange, genre, isDesc, games, term, id);
    dispatch(GetGamesMoreAC(data.games));
    dispatch(SetLoginProfileGamesFilter(price, date, prices, dateRange, genre, isDesc, count, term));
    dispatch(toggleFetching(false));
  } catch (err) {}
};

export const uploadAvatar = (file) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    let data = await userAPI.setAvatarForUser(formData);
    dispatch(setIsAuthAndUser(data[0], true));
  } catch (err) {
    console.log(err);
  }
};

export const setGamesForUser = (userId, gameId) => async (dispatch) => {
  try {
    let response = await userAPI.setGameForUser(userId, gameId);
    dispatch(GetProfileGamesReduserCreator(response.data));
  } catch (err) {}
};

export default UserReduser;
