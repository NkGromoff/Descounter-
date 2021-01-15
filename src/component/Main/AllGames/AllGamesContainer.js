import { useEffect } from "react";
import { connect } from "react-redux";
import AllGames from "./AllGames";
import {
  getGames,
  SetGamesFilter,
  getGamesMoreList,
  getGameGenre,
} from "../../../redux/AllGamesReduser";

const AllGamesContainer = (props) => {
  return (
    <AllGames
      games={props.allGames}
      getGames={props.getGames}
      getGamesMore={props.getGamesMoreList}
      filter={props.filter}
      getGameGenre={props.getGameGenre}
      allGamesGenre={props.allGamesGenre}
    />
  );
};

let mapStateToProps = (state) => {
  return {
    allGames: state.AllGamesReduser.games,
    filter: state.AllGamesReduser.filter,
    allGamesGenre: state.AllGamesReduser.genre,
  };
};

export default connect(mapStateToProps, {
  getGames,
  getGameGenre,
  SetGamesFilter,
  getGamesMoreList,
})(AllGamesContainer);
