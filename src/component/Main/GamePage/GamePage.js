import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ClearOneGameReduser, getGame, updGame } from "../../../redux/GamePageReduser";
import { setGamesForUser } from "../../../redux/UserReduser";
import { findGame, formatDate } from "../../shared/generalDataForGame";
import { Preloader } from "../../shared/Preloader";
import { Helmet } from "react-helmet";
import notImg from "../../../image/noImg.svg";

import ShopCart from "./ShopCart";
import { SystemRec } from "./SystemRec";

function GamePage(props) {
  let date;

  let gameid;

  const dispatch = useDispatch();

  const history = useHistory();

  const user = useSelector((state) => state.UserReduser.user);

  const isAuth = useSelector((state) => state.UserReduser.isAuth);

  const userGames = useSelector((state) => state.UserReduser.games);

  const oneGame = useSelector((state) => state.GamePageReduser.oneGame);

  const oneGameShop = useSelector((state) => state.GamePageReduser.oneGameShop);

  const [isMyGame, setIsMyGame] = useState(true);

  const [isDropDownSetting, setIsDropDownSetting] = useState(false);

  let minPrice = 0;

  let gameShop = null;

  let gameAddOrDel = () => {
    if (!isAuth) return history.push("/Login");
    dispatch(setGamesForUser(user.id, oneGame[0].game_id));
  };

  const dropDownSettingChange = () => {
    setIsDropDownSetting((prev) => !prev);
  };

  gameShop = oneGameShop.map((s) => (
    <ShopCart
      key={s.id}
      price={s.price}
      prevPrice={s.starting_price}
      name={s.name}
      amountDisc={s.amount_discount}
      url={s.url}
      available={s.available}
    />
  ));

  if (oneGame[0]) {
    date = oneGame[0].year_release;
    gameid = oneGame[0].game_id;
  }
  useEffect(() => {
    if (findGame(gameid, userGames)) {
      setIsMyGame(true);
    } else {
      setIsMyGame(false);
    }
  }, [userGames, gameid]);

  useEffect(() => {
    dispatch(getGame(props.match.params.id));
    window.scrollTo(0, 0);
    return () => {
      dispatch(ClearOneGameReduser());
    };
  }, []);

  if (!oneGame[0] && !oneGameShop.length > 0) {
    return (
      <div className="container loading">
        <Preloader />
      </div>
    );
  }
  if (oneGameShop.length > 0) minPrice = oneGameShop[0].price;
  return (
    <>
      <Helmet>
        <title>{oneGame[0].title + " купить от " + minPrice + " ₽"}</title>
        <meta name="description" content={oneGame[0].description} />
        <meta name="keywords" content={`купить ${oneGame[0].title} дешево, купить ${oneGame[0].title} со скидкой, купить ${oneGame[0].title}`} />
      </Helmet>
      <div className="container">
        <section className="game">
          <div className="game__wrapper">
            <div className="game__left">
              <img
                src={oneGame[0].img_url != 0 ? oneGame[0].img_url : notImg}
                alt="Изображение игры"
                className="game__gameImg"
              />
              <div className="game__dateWrapper">
                <h2 className="game__dateTittle">Дата выхода:</h2>
                <span className="game__dateText">{formatDate(new Date(date))}</span>
              </div>
              <SystemRec {...oneGame} />
            </div>
            <div className="game__right">
              <h1 className="game__tittle">
                {oneGame[0].title}
                {!isAuth ? (
                  <div className="game__addIconWrapper">
                    <svg
                      width="22"
                      height="22"
                      onClick={gameAddOrDel}
                      viewBox="0 0 18 18"
                      className="game__addGameIcon"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="10" width="3" height="17" rx="1" transform="rotate(-90 0 10)" />
                      <rect x="7" width="3" height="17" rx="1" />
                    </svg>
                    <span className="game__toolTip">Добавить игру?</span>
                  </div>
                ) : isMyGame ? (
                  <div className="game__addIconWrapper">
                    <svg
                      width="22"
                      height="22"
                      onClick={gameAddOrDel}
                      viewBox="0 0 18 18"
                      className="game__addGameIcon"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="10" width="3" height="17" rx="1" transform="rotate(-90 0 10)" />
                      <rect x="0" width="3" height="17" rx="1" transform="rotate(-90 0 10)" />
                    </svg>
                    <span className="game__toolTip">Убрать игру?</span>
                  </div>
                ) : (
                  <div className="game__addIconWrapper">
                    <svg
                      width="22"
                      height="22"
                      onClick={gameAddOrDel}
                      viewBox="0 0 18 18"
                      className="game__addGameIcon"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="10" width="3" height="17" rx="1" transform="rotate(-90 0 10)" />
                      <rect x="7" width="3" height="17" rx="1" />
                    </svg>
                    <span className="game__toolTip">Добавить игру?</span>
                  </div>
                )}
              </h1>
              {user.admin && (
                <button onClick={dropDownSettingChange} className="game__changeAdmin">
                  <svg viewBox="0 0 24 24" className="game__changeAdminIcon">
                    <path d="m22.683 9.394-1.88-.239c-.155-.477-.346-.937-.569-1.374l1.161-1.495c.47-.605.415-1.459-.122-1.979l-1.575-1.575c-.525-.542-1.379-.596-1.985-.127l-1.493 1.161c-.437-.223-.897-.414-1.375-.569l-.239-1.877c-.09-.753-.729-1.32-1.486-1.32h-2.24c-.757 0-1.396.567-1.486 1.317l-.239 1.88c-.478.155-.938.345-1.375.569l-1.494-1.161c-.604-.469-1.458-.415-1.979.122l-1.575 1.574c-.542.526-.597 1.38-.127 1.986l1.161 1.494c-.224.437-.414.897-.569 1.374l-1.877.239c-.753.09-1.32.729-1.32 1.486v2.24c0 .757.567 1.396 1.317 1.486l1.88.239c.155.477.346.937.569 1.374l-1.161 1.495c-.47.605-.415 1.459.122 1.979l1.575 1.575c.526.541 1.379.595 1.985.126l1.494-1.161c.437.224.897.415 1.374.569l.239 1.876c.09.755.729 1.322 1.486 1.322h2.24c.757 0 1.396-.567 1.486-1.317l.239-1.88c.477-.155.937-.346 1.374-.569l1.495 1.161c.605.47 1.459.415 1.979-.122l1.575-1.575c.542-.526.597-1.379.127-1.985l-1.161-1.494c.224-.437.415-.897.569-1.374l1.876-.239c.753-.09 1.32-.729 1.32-1.486v-2.24c.001-.757-.566-1.396-1.316-1.486zm-10.683 7.606c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
                  </svg>
                </button>
              )}
              <img
                src={oneGame[0].img_url != 0 ? oneGame[0].img_url : notImg}
                alt="Изображение игры"
                className="game__gameImgTwo"
              />
              <div className="game__wrapperShop">{gameShop}</div>
              <div className="game__textWrapper">
                <h3 className="game__descTittle">Описание</h3>
                <p className="game__descText">{oneGame[0].description}</p>
              </div>
            </div>
          </div>
          <div className={`game__modalChange ${isDropDownSetting ? "game__modalChange--active" : ""}`}>
            <Formik
              initialValues={{
                name: oneGame[0].title,
                date: formatDate(new Date(date)),
                description: oneGame[0].description,
              }}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(updGame(oneGame[0].game_id, values.name, values.description, values.date));
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <div className="game__modalChangeWrapper">
                    <div className="game__modalChangeHeader">
                      <h2 className="game__modalChangeTittle">Настройки</h2>
                      <span onClick={dropDownSettingChange} className="game__modalChangeExit">
                        X
                      </span>
                    </div>
                    <div className="game__modalChangeBody">
                      <div className="game__modalChangeItem">
                        <span className="game__modalChangeSubTitle">Название</span>
                        <Field name="name" type="text" className="game__modalChangeInput" />
                      </div>
                      <div className="game__modalChangeItem">
                        <span className="game__modalChangeSubTitle">Дата выхода</span>
                        <Field name="date" type="date" className="game__modalChangeInput" />
                      </div>
                      <div className="game__modalChangeItem">
                        <span className="game__modalChangeSubTitle">Описание</span>
                        <Field
                          as="textarea"
                          name="description"
                          className="game__modalChangeInput game__modalChangeInputTextArea"
                        />
                      </div>
                      <div className="game__modalChangeItem">
                        <span className="game__modalChangeSubTitle">Изображение</span>
                        <input accept="image/*" type="file" className="game__modalChangeInput" />
                      </div>
                      <button disabled={isSubmitting} className="game__modalChangeButton">
                        Изменить
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </div>
    </>
  );
}

export default GamePage;
