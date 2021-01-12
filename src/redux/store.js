import { applyMiddleware, combineReducers, createStore } from "redux";
import AllGamesReduser from "./AllGamesReduser";
import GamePageReduser from "./GamePageReduser";
import thunkMiddleware from "redux-thunk";

let redusers = combineReducers({
  AllGamesReduser,
  GamePageReduser,
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
