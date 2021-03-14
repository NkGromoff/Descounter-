import { mainPageAPI } from "../api/mainPageAPI";

const Set_Main_Page_Games_Reduser_Creator = "Set_Main_Page_Games_Reduser_Creator";

const Set_Main_Page_Games_Id_Reduser_Creator = "Set_Main_Page_Games_Id_Reduser_Creator";
const Set_Main_Page_Games_Id_Null_Reduser_Creator = "Set_Main_Page_Games_Id_Null_Reduser_Creator";
const Set_Main_Page_Games_Genre_Reduser_Creator = "Set_Main_Page_Games_Genre_Reduser_Creator";
const Set_Main_Page_Games_Genre_Id_Reduser_Creator = "Set_Main_Page_Games_Genre_Id_Reduser_Creator";

let initialState = {
  games: null,
  idArray: null,
  genreGames: null,
  idArrayOfGenreGames: null,
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

export const getGamesGenre = (genre) => async (dispatch) => {
  try {
    let data = await mainPageAPI.getGamesGenre(genre);
    let arr = [];
    let obj = [];
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

export default MainPageReduser;
