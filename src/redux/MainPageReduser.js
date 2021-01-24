import { mainPageAPI } from "../api/api";

const Set_Main_Page_Games_Reduser_Creator = "Set_Main_Page_Games_Reduser_Creator";

const Set_Main_Page_Games_Id_Reduser_Creator = "Set_Main_Page_Games_Id_Reduser_Creator";
const Set_Main_Page_Games_Id_Null_Reduser_Creator = "Set_Main_Page_Games_Id_Null_Reduser_Creator";

let initialState = {
  games: null,
  idArray: null,
  genreGames: {},
};

const MainPageReduser = (state = initialState, action) => {
  switch (action.type) {
    case Set_Main_Page_Games_Reduser_Creator:
      return { ...state, games: action.data };
    case Set_Main_Page_Games_Id_Reduser_Creator:
      return { ...state, idArray: action.data };
    case Set_Main_Page_Games_Id_Null_Reduser_Creator:
      return { ...state, idArray: null };
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

export const SetMainPageGamesIdNullReduserCreator = () => ({
  type: Set_Main_Page_Games_Id_Null_Reduser_Creator,
});

export const getGames = () => async (dispatch) => {
  try {
    let response = await mainPageAPI.getGames();
    let arr = [];

    let games = response.data;
    if (games) {
      games.map((a, key) => {
        if (key % 2 == 0) arr.push(a.id);
      });
    }
    dispatch(SetMainPageGamesIdReduserCreator(arr));
    dispatch(SetMainPageGamesReduserCreator(response.data));
  } catch (err) {}
};

export default MainPageReduser;
