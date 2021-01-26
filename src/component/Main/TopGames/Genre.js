import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Genre(props) {
  let mainCartEl = [];
  let gamesGenre = useSelector((state) => state.MainPageReduser.genreGames);
  if (gamesGenre) {
    gamesGenre[0].gamesForMainPage.forEach((value, key) => {
      if (key % 2 == 0 && key < gamesGenre[0].gamesForMainPage.length) {
        mainCartEl.push(
          <MainCarts
            key={value.id}
            id={value.id}
            img={value.img_url}
            price={value.price}
            platform_id={value.platform_id}
            amountDesc={value.amount_discount}
            imgBack={gamesGenre[0].gamesForMainPage[key + 1].img_url}
            amountDescBack={gamesGenre[0].gamesForMainPage[key + 1].amount_discount}
            priceBack={gamesGenre[0].gamesForMainPage[key + 1].price}
            idBack={gamesGenre[0].gamesForMainPage[key + 1].id}
            gamesArray={gamesGenre[0].gamesForMainPage}
          />
        );
      }
    });
  }
  return (
    <>
      <div className="container">
        <section className="gameGallery">{/* <div className="gameGallery__wrapper">{mainCartEl}</div> */}</section>
      </div>
    </>
  );
}

export default Genre;
