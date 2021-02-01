import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import photoImg from "../../image/profileImg.png";
import { setIsAuthAndUser, setLogout } from "../../redux/UserReduser";
import Login from "../Main/Login/Login";

const Header = (props) => {
  const [isDown, setIsDown] = useState(false);

  const [burgerMenu, setBurgerMenu] = useState(false);

  const isAuth = useSelector((state) => state.UserReduser.isAuth);

  const user = useSelector((state) => state.UserReduser.user);

  const avatarImg = user.avatar ? "http://localhost:4000/" + user.avatar : photoImg;

  const dispatch = useDispatch();

  let setDropDowm = () => {
    if (isDown) setIsDown(false);
    else setIsDown(true);
  };

  let logOut = () => {
    localStorage.removeItem("token");
    dispatch(setLogout());
  };

  let onClickBurger = () => {
    setBurgerMenu((prev) => !prev);
  };
  useEffect(() => {
    if (isAuth) {
      setBurgerMenu(false);
    }
  }, [isAuth]);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <NavLink to="/" className="logo header__logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 279.76 146.67">
                <g>
                  <g>
                    <text className="cls-1" transform="translate(18.84 75.72)">
                      DESCOUNTER
                    </text>
                    <path
                      className="cls-2"
                      d="M102.91,21.82h134.5a17.15,17.15,0,0,1,15,8.77c20,35.69,47.71,149.35-5,103.23-48.12-51.76-98.82-37.64-98.82-37.64"
                    />
                    <path className="cls-3" d="M121.73,21.49v-2.4c0-.44.25-.8.56-.8h6.89c.31,0,.55.36.55.8v2.4" />

                    <path
                      className="cls-5 animate"
                      d="M125.73,19.27c4-20.51-21-17-42.11-17.67C16.32-.4,1.5,27.43,1.5,67.41S8.67,160.78,46,133.35c64-47.06,132.52-19.72,132.52-19.72"
                    />
                  </g>
                </g>
              </svg>
            </NavLink>
            {isAuth ? (
              <button
                onClick={setDropDowm}
                className={`header__profile-wrapper ${isDown ? "header__profile-wrapper--active" : ""}`}
              >
                <span className="header__profileName">{user.username}</span>
                <div className="header__profile-imgInner">
                  <img src={avatarImg} alt="Изображение профиля" />
                </div>
                {isDown == true ? (
                  <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg" className={`header__profileTriggle`}>
                    <path d="M0 5.16016H7.93L5.94825 2.58016L3.9655 0.000156403L1.98275 2.58016L0 5.16016Z" />
                  </svg>
                ) : (
                  <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg" className={`header__profileTriggle`}>
                    <path d="M1.656 1h7.931L7.605 3.58 5.622 6.16 3.639 3.58 1.656 1z" />
                  </svg>
                )}
                <div className={`header__dropDownWrapper ${isDown ? `header__dropDownWrapper--active` : ``}`}>
                  <NavLink to="/profile" className="header__dropDownItem">
                    Профиль
                  </NavLink>
                  <NavLink onClick={logOut} to="/" className="header__dropDownItem">
                    Выход
                  </NavLink>
                </div>
              </button>
            ) : (
              <>
                <div className="header__textWrapper">
                  <NavLink to="/Login" className="header__login">
                    Вход
                  </NavLink>
                  <NavLink to="/Registration" className="header__reg">
                    Регистрация
                  </NavLink>
                </div>
                <button
                  onClick={onClickBurger}
                  className={`header__burgerMenuBtn ${burgerMenu ? "header__burgerMenuBtn--active" : ""}`}
                >
                  <span className="header__burgerMenuLine"></span>
                  <span className="header__burgerMenuLine"></span>
                  <span className="header__burgerMenuLine"></span>
                </button>
              </>
            )}
          </div>
        </div>
        <div className={`header__leftMenu ${burgerMenu ? "header__leftMenu--active" : ""}`}>
          <Login />
          <NavLink to="/Registration" className="header__reg leftRegLink">
            Регистрация
          </NavLink>
        </div>
      </header>
    </>
  );
};

export default Header;
