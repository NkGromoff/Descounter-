import React from "react";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <NavLink to="/" className="logo header__logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 279.76 146.67"
              >
                <g>
                  <g>
                    <text className="cls-1" transform="translate(18.84 75.72)">
                      DESCOUNTER
                    </text>
                    <path
                      className="cls-2"
                      d="M102.91,21.82h134.5a17.15,17.15,0,0,1,15,8.77c20,35.69,47.71,149.35-5,103.23-48.12-51.76-98.82-37.64-98.82-37.64"
                    />
                    <path
                      className="cls-3"
                      d="M121.73,21.49v-2.4c0-.44.25-.8.56-.8h6.89c.31,0,.55.36.55.8v2.4"
                    />

                    <path
                      className="cls-5 animate"
                      d="M125.73,19.27c4-20.51-21-17-42.11-17.67C16.32-.4,1.5,27.43,1.5,67.41S8.67,160.78,46,133.35c64-47.06,132.52-19.72,132.52-19.72"
                    />
                  </g>
                </g>
              </svg>
            </NavLink>

            <div className="header__profile-wrapper">
              <div className="header__profile-imgInner"></div>
              <img
                src="image/triggle.svg"
                alt="Вниз"
                className="header__triggle"
              />
            </div>
            <div className="header__textWrapper">
              <NavLink to="/Login" className="header__login">
                Вход
              </NavLink>
              <NavLink to="/Registration" className="header__reg">
                Регистрация
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
