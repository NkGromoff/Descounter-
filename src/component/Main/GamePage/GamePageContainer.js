import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import GamePage from "../GamePage/GamePage";
import { ClearOneGameReduser, getGame } from "../../../redux/GamePageReduser";

const GamePageContainer = (props) => {
  useEffect(() => {
    props.getGame(props.match.params.id);
    return () => {
      props.ClearOneGameReduser();
    };
  }, []);
  return <GamePage {...props.oneGame} oneGameShop={props.oneGameShop} />;
};

const mapStateToProps = (state) => ({
  oneGame: state.GamePageReduser.oneGame,
  oneGameShop: state.GamePageReduser.oneGameShop,
});

let GamePageContainerRouter = withRouter(GamePageContainer);

export default connect(mapStateToProps, { ClearOneGameReduser, getGame })(
  GamePageContainerRouter
);
