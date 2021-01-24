import { applyMiddleware, combineReducers, createStore } from "redux";
import AllGamesReduser from "./AllGamesReduser";
import GamePageReduser from "./GamePageReduser";
import UserReduser from "./UserReduser";
import MainPageReduser from "./MainPageReduser";
import thunkMiddleware from "redux-thunk";

let redusers = combineReducers({
  AllGamesReduser,
  GamePageReduser,
  UserReduser,
  MainPageReduser,
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
