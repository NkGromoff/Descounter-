import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, SetMainPageGamesIdNullReduserCreator } from "../../../redux/MainPageReduser";
import MainCarts from "./mainCarts";

function Banners(props) {
  let mainCartEl = [];
  const games = useSelector((state) => state.MainPageReduser.games);
  let arr = useSelector((state) => state.MainPageReduser.idArray);
  const dispatch = useDispatch();
  const [idForFlip, setIdForFlip] = useState([]);
  const [idForDontFlip, setIdForDontFlip] = useState();

  useEffect(() => {
    dispatch(getGames());
    return () => {
      dispatch(SetMainPageGamesIdNullReduserCreator());
    };
  }, []);

  useEffect(() => {
    if (arr) {
      const interval = setInterval(() => {
        setIdForFlip(arr[Math.floor(Math.random() * arr.length)]);
        const isTwoNumber = Math.floor(Math.random() * (200 - 100) + 100);
        if (isTwoNumber >= 170) {
          let newState = arr[Math.floor(Math.random() * arr.length)];
          setIdForFlip([...idForFlip, newState]);
        }
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [arr]);

  if (games) {
    games.forEach((value, key) => {
      if (key % 2 == 0 && key < games.length) {
        mainCartEl.push(
          <MainCarts
            key={value.id}
            id={value.id}
            img={value.img_url}
            price={value.price}
            platform_id={value.platform_id}
            amountDesc={value.amount_discount}
            imgBack={games[key + 1].img_url}
            amountDescBack={games[key + 1].amount_discount}
            priceBack={games[key + 1].price}
            idBack={games[key + 1].id}
            gamesArray={games}
            idForFlip={idForFlip}
          />
        );
      }
    });
  }

  return (
    <>
      <section className="gameGallery">
        <div className="gameGallery__wrapper">{mainCartEl}</div>
      </section>
    </>
  );
}

export default Banners;
