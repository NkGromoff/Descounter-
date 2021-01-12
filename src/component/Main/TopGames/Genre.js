import React from "react";
import GameCart from "../GameCart/GameCart";
import { NavLink } from "react-router-dom";

function Genre(props) {
  return (
    <>
      <div className="container">
        <section className="topGenre">
          <h2 className="topGenre__tittle genreTittle">{props.name}</h2>
          <ul className="topGenre__listWrapper">
            <li className="topGenre__listItem">
              <GameCart />
            </li>
          </ul>
          <div className="topGenre__linkWrapper">
            <NavLink to="/AllGames" className="topGenre__link linkAllGames">
              Больше
            </NavLink>
          </div>
        </section>
      </div>
    </>
  );
}

export default Genre;
