import React, { useEffect } from "react";

import zakazakaImg from "../../../image/zakazaka.svg";
import steamImg from "../../../image/steam.svg";
import steamBuyImg from "../../../image/steamBuy.svg";
import steamPayImg from "../../../image/steampay.svg";
import steamAccImg from "../../../image/steam-account.svg";
import gamerayImg from "../../../image/gameray.svg";
import gamazavrImg from "../../../image/gamazavr.svg";
import noneImg from "../../../image/notImg.jpg";

function ShopCart(props) {
    let logoImg = null;
    let ShopCartImg = (name) => {
        switch (name) {
            case "steam":
                return (logoImg = steamImg);
            case "steambuy":
                return (logoImg = steamBuyImg);
            case "zakazaka":
                return (logoImg = zakazakaImg);
            case "steampay":
                return (logoImg = steamPayImg);
            case "steam-account":
                return (logoImg = steamAccImg);
            case "gameray":
                return (logoImg = gamerayImg);
            case "gamazavr":
                return (logoImg = gamazavrImg);
            default:
                return (logoImg = noneImg);
        }
    };

    ShopCartImg(props.name);
    if (!props.available) {
        return (
            <a className="game__shopCart" href={props.url}>
                <img src={logoImg} alt="Изображение магазина" className="game__shopImg" />
                <div className="game__priceWrapper">
                    <span className="game__priceNow">Нет в наличии</span>
                </div>
            </a>
        );
    }

    if (props.prevPrice === 0) {
        return (
            <a className="game__shopCart" href={props.url}>
                <img src={logoImg} alt="Изображение магазина" className="game__shopImg" />
                <div className="game__priceWrapper">
                    {props.price !== 0 ? <span className="game__priceNow">{props.price} ₽</span> : <span className="game__priceNow">Бесплатно</span>}
                </div>
            </a>
        );
    }
    if (props.prevPrice !== 0) {
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
