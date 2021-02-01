import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import MainCarts from "./mainCarts";

function Genre(props) {
  let mainCartEl = [];
  const [idForFlip, setIdForFlip] = useState([]);
  let arr = useSelector((state) => state.MainPageReduser.idArrayOfGenreGames);
  useEffect(() => {
    if (arr) {
      const interval = setInterval(() => {
        setIdForFlip(arr[Math.floor(Math.random() * arr.length)]);
        const isTwoNumber = Math.floor(Math.random() * (200 - 100) + 100);
        if (isTwoNumber >= 170) {
          let newState = arr[Math.floor(Math.random() * arr.length)];
          setIdForFlip([...idForFlip, newState]);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [arr]);
  props.gamesArray.forEach((value, key) => {
    if (key % 2 == 0 && key < props.gamesArray.length) {
      mainCartEl.push(
        <MainCarts
          key={value.id}
          id={value.id}
          img={value.img_url}
          price={value.price}
          platform_id={value.platform_id}
          amountDesc={value.amount_discount}
          imgBack={props.gamesArray[key + 1].img_url}
          amountDescBack={props.gamesArray[key + 1].amount_discount}
          priceBack={props.gamesArray[key + 1].price}
          idBack={props.gamesArray[key + 1].id}
          gamesArray={props.gamesArray}
          idForFlip={idForFlip}
        />
      );
    }
  });

  return (
    <>
      <section className="gameGallery">
        <h2 className="gameGallery__tittle genreTittle">{props.title}</h2>
        <div className="gameGallery__wrapper">{mainCartEl}</div>
        <div className="gameGallery__linkWrapper">
          <NavLink to={`/allGames?genre=${props.title}`} className="gameGallery__link">
            Больше
          </NavLink>
        </div>
      </section>
    </>
  );
}

export default Genre;
