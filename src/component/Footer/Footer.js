import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__wrapper">
            <div className="footer__textWrapper">
              <NavLink to="/About" className="footer__text">
                О нас
              </NavLink>
              <NavLink to="/Agree" className="footer__text">
                Соглашение
              </NavLink>
              <a href="mailto:suppot@descounter.ru" className="footer__text">
                suppot@descounter.ru
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
