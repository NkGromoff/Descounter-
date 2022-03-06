import { gamesAPI } from "../api/gamesAPI";
import { mainPageAPI } from "../api/mainPageAPI";
import { toggleFetching } from "./AllGamesReduser";

const Set_Main_Page_Games_Reduser_Creator = "Set_Main_Page_Games_Reduser_Creator";

const Set_Main_Page_Games_Id_Reduser_Creator = "Set_Main_Page_Games_Id_Reduser_Creator";
const Set_Main_Page_Games_Id_Null_Reduser_Creator = "Set_Main_Page_Games_Id_Null_Reduser_Creator";
const Set_Main_Page_Games_Genre_Reduser_Creator = "Set_Main_Page_Games_Genre_Reduser_Creator";
const Set_Main_Page_Initialazed = "Set_Main_Page_Initialazed";
const Set_Main_Page_Games_Genre_Id_Reduser_Creator = "Set_Main_Page_Games_Genre_Id_Reduser_Creator";
const Set_Main_Page_Search_Games = "Set_Main_Page_Search_Games";

let initialState = {
  games: null,
  idArray: null,
  genreGames: null,
  idArrayOfGenreGames: null,
  initManPage: false,
  gamesSearch: [],
};

const MainPageReduser = (state = initialState, action) => {
  switch (action.type) {
    case Set_Main_Page_Games_Reduser_Creator:
      return { ...state, games: action.data };
    case Set_Main_Page_Games_Id_Reduser_Creator:
      return { ...state, idArray: action.data };
    case Set_Main_Page_Games_Genre_Id_Reduser_Creator:
      return { ...state, idArrayOfGenreGames: action.data };
    case Set_Main_Page_Games_Id_Null_Reduser_Creator:
      return { ...state, idArray: null, idArrayOfGenreGames: null };
    case Set_Main_Page_Games_Genre_Reduser_Creator:
      return { ...state, genreGames: action.data };
    case Set_Main_Page_Initialazed:
      return { ...state, initManPage: true };
    case Set_Main_Page_Search_Games:
      return { ...state, gamesSearch: action.data };
    default:
      return state;
  }
};

export const SetMainPageGamesReduserCreator = (data) => ({
  type: Set_Main_Page_Games_Reduser_Creator,
  data: data,
});

export const SetMainPageGamesIdReduserCreator = (data) => ({
  type: Set_Main_Page_Games_Id_Reduser_Creator,
  data: data,
});

export const SetMainPageGamesGenreIdReduserCreator = (data) => ({
  type: Set_Main_Page_Games_Genre_Id_Reduser_Creator,
  data: data,
});

export const SetMainPageGamesIdNullReduserCreator = () => ({
  type: Set_Main_Page_Games_Id_Null_Reduser_Creator,
});

export const SetMainPageGamesGenreReduserCreator = (data) => ({
  type: Set_Main_Page_Games_Genre_Reduser_Creator,
  data: data,
});

export const SetMainPageSearchGames = (data) => ({
  type: Set_Main_Page_Search_Games,
  data: data,
});

export const SetMainInitialazed = () => ({
  type: Set_Main_Page_Initialazed,
});

export const getGames = () => async (dispatch) => {
  try {
    let data = await mainPageAPI.getGames();
    let arr = [];

    let games = data;
    if (games) {
      games.map((a, key) => {
        if (key % 2 == 0) arr.push(a.id);
      });
    }
    dispatch(SetMainPageGamesIdReduserCreator(arr));
    dispatch(SetMainPageGamesReduserCreator(data));
  } catch (err) {}
};

export const searchGames = (term) => async (dispatch) => {
  try {
    await dispatch(toggleFetching(true));
    let data = await gamesAPI.getGames("none", "none", [0, 9999], [1997, 2021], [], null, null, term);
    dispatch(SetMainPageSearchGames(data.games));
    await dispatch(toggleFetching(false));
  } catch (err) {}
};

export const getGamesGenre = (genre) => async (dispatch) => {
  try {
    let data = await mainPageAPI.getGamesGenre(genre);
    let arr = [];
    let games = data;
    if (games) {
      games.map((i) => {
        i.gamesForMainPage.map((a, key) => {
          if (key % 2 == 0) arr.push(a.id);
        });
      });
    }
    dispatch(SetMainPageGamesGenreIdReduserCreator(arr));
    dispatch(SetMainPageGamesGenreReduserCreator(data));
  } catch (err) {}
};

export const setMainPageInitialazed = (genre) => async (dispatch) => {
  let responseGames = await dispatch(getGames());
  let responseGamesGenre = await dispatch(getGamesGenre(genre));
  Promise.all([responseGames, responseGamesGenre]).then(() => dispatch(SetMainInitialazed()));
};

export default MainPageReduser;
