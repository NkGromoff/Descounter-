import React, { useEffect, useState } from "react";
import GamesDisplay from "../../shared/gamesDisplay";
import photoImg from "../../../image/profileImg.png";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getGames, uploadAvatar } from "../../../redux/UserReduser";

const Profile = (props) => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.UserReduser.isAuth);

  const user = useSelector((state) => state.UserReduser.user);

  const games = useSelector((state) => state.UserReduser.games);

  const avatarImg = user.avatar ? "http://localhost:4000/" + user.avatar : photoImg;

  const [state, setState] = useState({
    years: "",
    prices: "",
    filterPrice: "",
    filterNewDate: "",
    isDesc: false,
    genre: [],
    isGamesMore: false,
    term: null,
  });

  const uploadAvatarEvent = (e) => {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  };

  const childProps = (years, prices, filterPrice, filterNewDate, isDesc, genre, isGamesMore, term) => {
    setState({
      years: years,
      prices: prices,
      filterPrice: filterPrice,
      filterNewDate: filterNewDate,
      isDesc: isDesc,
      genre: genre,
      isGamesMore: isGamesMore,
      term: term,
    });
  };

  useEffect(() => {
    dispatch(
      getGames(
        state.filterPrice,
        state.filterNewDate,
        state.prices,
        state.years,
        state.genre,
        state.isDesc,
        null,
        state.term,
        user.id
      )
    );
  }, [
    state.filterPrice,
    state.filterNewDate,
    state.genre,
    state.isDesc,
    state.years,
    state.prices,
    state.term,
    user.id,
  ]);

  if (!isAuth) return <Redirect to="/Login" />;
  return (
    <>
      <div className="container">
        <section className="profile">
          <div className="profile__wrapper">
            <div className="profile__wrapperTop">
              <div className="profile__imgWraper">
                <img src={avatarImg} alt="Изображение профиля" className="profile__image" />
                <label onChange={uploadAvatarEvent} className="profile__fileuploadWrapper">
                  <input accept="image/*" className="profile__fileupload" type="file" name="file" id="" />
                  <span className="profile__fileText">Изменить</span>
                </label>
              </div>
              <div className="profile__textInfoAllWrapper">
                <label className="profile__textInfoWrapper">
                  <span className="profile__textInfoSpan">Ваш логин:</span>
                  <input type="text" className="profile__input" value={user.username} />
                </label>
                <label className="profile__textInfoWrapper">
                  <span className="profile__textInfoSpan">Ваша почта:</span>
                  <input type="text" className="profile__input" value={user.email} />
                </label>
                <label className="profile__textInfoWrapper">
                  <span className="profile__textInfoSpan">Ваш пароль:</span>
                  <input type="text" className="profile__input" />
                </label>
              </div>
            </div>
            <div className="profile__dateRegWrapper">
              <span className="profile__dateRegSpan">Дата регистрации:</span>
              <span className="profile__dateReg">12.05.2021</span>
            </div>
          </div>
        </section>
      </div>
      <GamesDisplay childProps={childProps} games={games} />
    </>
  );
};

export default Profile;
