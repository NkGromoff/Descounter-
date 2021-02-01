import { userAPI } from "../api/api";
import { Redirect, useHistory } from "react-router-dom";
import { auth, getGames } from "./UserReduser";
import { useSelector } from "react-redux";

const Set_Initialazed_App = "Set_Initialazed_App";

let initialState = {
  init: false,
};

const AppReduser = (state = initialState, action) => {
  switch (action.type) {
    case Set_Initialazed_App:
      return { ...state, init: true };
    default:
      return state;
  }
};

export const initialazedAction = (data) => ({
  type: Set_Initialazed_App,
});

export const setInitialazed = () => async (dispatch) => {
  try {
    let response = await dispatch(auth());

    Promise.all([response]).then(() => dispatch(initialazedAction()));
  } catch (err) {
    console.log(err);
  }
};

export default AppReduser;
