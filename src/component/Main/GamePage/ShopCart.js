import React from "react";

import zakazakaImg from "../../../image/zakazaka.png";
import steamImg from "../../../image/Steam.jpg";
import steamBuyImg from "../../../image/steamBuy.png";
import steamPayImg from "../../../image/steampay.jpg";

function ShopCart(props) {
  let logoImg = null;
  let ShopCartImg = (name) => {
    switch (name) {
      case "steam":
        return (logoImg = steamImg);
      case "steamBuy":
        return (logoImg = steamBuyImg);
      case "zakazaka":
        return (logoImg = zakazakaImg);
      case "steamPay":
        return (logoImg = steamPayImg);
      default:
        return (logoImg = null);
    }
  };
  ShopCartImg(props.name);
  if (props.prevPrice === 0) {
    return (
      <a className="game__shopCart" href={props.url}>
        <img src={logoImg} alt="Изображение магазина" className="game__shopImg" />
        <div className="game__priceWrapper">
          {props.price != 0 ? (
            <span className="game__priceNow">{props.price} ₽</span>
          ) : (
            <span className="game__priceNow">Беслпатно</span>
          )}
        </div>
      </a>
    );
  }
  if (!props.prevPrice == 0) {
    return (
      <a className="game__shopCart" href={props.url}>
        <img src={logoImg} alt="Изображение магазина" className="game__shopImg" />
        <div className="game__priceWrapper">
          <div className="game__priceInnerUnDesc ">
            <span className="game__pricePrev">{props.prevPrice} ₽</span>
            <span className="game__priceNow">{props.price} ₽</span>
          </div>
          <span className="game__numDesc">{props.amountDisc}%</span>
        </div>
      </a>
    );
  }
  return <div className="container">Загрузка</div>;
}

export default ShopCart;
