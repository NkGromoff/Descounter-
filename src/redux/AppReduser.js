import { gamesAPI } from "../api/gamesAPI";
import { auth } from "./UserReduser";

const Set_Initialazed_App = "Set_Initialazed_App";

let initialState = {
  init: false,
  genre: [],
};

const AppReduser = (state = initialState, action) => {
  switch (action.type) {
    case Set_Initialazed_App:
      return { ...state, init: true, genre: action.genre };
    default:
      return state;
  }
};

export const initialazedAction = (genre) => ({
  type: Set_Initialazed_App,
  genre: genre,
});

export const setInitialazed = () => async (dispatch) => {
  try {
    let response = await dispatch(auth());
    let responseGenre = await gamesAPI.getAllGenre();
    Promise.all([response, responseGenre]).then(() => dispatch(initialazedAction(responseGenre)));
  } catch (err) {
    console.log(err);
  }
};

export default AppReduser;
