import { debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import notImg from "../../../image/notImg.jpg";
import { setGamesForUser } from "../../../redux/UserReduser";
import { findGame, formatDate, IconsPl } from "../../shared/generalDataForGame";

function GameCart(props) {
  let date;

  const dispatch = useDispatch();

  const user = useSelector((state) => state.UserReduser.user);

  const history = useHistory();

  const trottleAddGame = useCallback(
    debounce(() => dispatch(setGamesForUser(props.user.id, props.id)), 500),
    []
  );

  if (props) date = props.year;

  const [isMyGame, setIsMyGame] = useState(true);

  useEffect(() => {
    if (findGame(props.id, props.userGames)) {
      setIsMyGame(true);
    } else {
      setIsMyGame(false);
    }
  }, [props.userGames]);

  let gameAddOrDel = (e) => {
    e.preventDefault();
    if (!props.isAuth) return history.push("/Login");
    trottleAddGame();
  };

  return (
    <>
      <NavLink to={"/GamePage/" + props.id} className="gameItem__link">
        {!props.isAuth ? (
          <div className="gameItem__addGameIconWraaper">
            <svg
              width="18"
              height="18"
              onClick={gameAddOrDel}
              viewBox="0 0 18 18"
              className="gameItem__addGameIcon"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="10" width="3" height="17" rx="1" transform="rotate(-90 0 10)" />
              <rect x="7" width="3" height="17" rx="1" />
            </svg>
            <span className="gameItem__toolTip">Добавить игру?</span>
          </div>
        ) : isMyGame ? (
          <div className="gameItem__addGameIconWraaper">
            <svg
              width="18"
              height="18"
              onClick={gameAddOrDel}
              viewBox="0 0 18 18"
              className="gameItem__addGameIcon"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="10" width="3" height="17" rx="1" transform="rotate(-90 0 10)" />
              <rect x="0" width="3" height="17" rx="1" transform="rotate(-90 0 10)" />
            </svg>
            <span className="gameItem__toolTip">Убрать игру?</span>
          </div>
        ) : (
          <div className="gameItem__addGameIconWraaper">
            <svg
              width="18"
              height="18"
              onClick={gameAddOrDel}
              viewBox="0 0 18 18"
              className="gameItem__addGameIcon"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="10" width="3" height="17" rx="1" transform="rotate(-90 0 10)" />
              <rect x="7" width="3" height="17" rx="1" />
            </svg>
            <span className="gameItem__toolTip">Добавить игру?</span>
          </div>
        )}
        <div className="gameItem__imgWrapper">
          {props.img != "None" ? (
            <img src={props.img} alt="Изображение игры" className="gameItem__img" />
          ) : (
            <img src={notImg} alt="Изображение игры" className="gameItem__img" />
          )}

          {props.amountDisc != 0 ? <span className="gameItem__descNumber">{props.amountDisc}%</span> : ""}
        </div>
        <div className="gameItem__textWrapper">
          <div className="gameItem__textInner">
            <h3 className="gameItem__itemTittle">{props.name}</h3>

            <div className="gameItem__textInnerTwo">
              <div className="gameItem__iconsWrapper">
                <IconsPl platformId={props.platformId} />
              </div>
              <span className="gameItem__genre">{props.tag}</span>
              <span className="gameItem__date">{formatDate(new Date(date))}</span>
            </div>
          </div>

          <div className="gameItem__priceWrapper">
            {props.price != 0 ? (
              <span className="gameItem__price">От {props.price} ₽</span>
            ) : (
              <span className="gameItem__price">Бесплатно</span>
            )}
          </div>
        </div>
      </NavLink>
    </>
  );
}

export default GameCart;
