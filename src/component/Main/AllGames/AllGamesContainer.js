import { useEffect } from "react";
import { connect } from "react-redux";
import AllGames from "./AllGames";
import {
  getGames,
  SetGamesFilter,
  getGamesMoreList,
} from "../../../redux/AllGamesReduser";

const AllGamesContainer = (props) => {
  useEffect(() => {
    props.getGames(
      props.filter.price,
      "none",
      props.filter.leftPrice,
      props.filter.rightPrice,
      props.filter.dateRange,
      props.filter.genre,
      props.filter.isDesc,
      null
    );
  }, []);
  return (
    <AllGames
      games={props.allGames}
      getGames={props.getGames}
      getGamesMore={props.getGamesMoreList}
      filter={props.filter}
    />
  );
};

let mapStateToProps = (state) => {
  return {
    allGames: state.AllGamesReduser.games,
    filter: state.AllGamesReduser.filter,
  };
};

export default connect(mapStateToProps, {
  getGames,
  SetGamesFilter,
  getGamesMoreList,
})(AllGamesContainer);
